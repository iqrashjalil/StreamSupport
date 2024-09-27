import mongoose from "mongoose";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Donation from "../models/Donation_Model.js";
import { ErrorHandler } from "../utils/error-handler.js";
import User from "../models/User_Model.js";
import moment from "moment";

const giveDonation = catchAsyncError(async (req, res, next) => {
  const { donatorName, amount, message } = req.body;
  const streamerId = req.params.id;

  // Ensure valid donation amount
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid donation amount." });
  }
  const createDonation = await Donation.create({
    donatorName,
    amount,
    message,
    transactionStatus: "Ok",
    streamer: streamerId,
  });
  await User.findByIdAndUpdate(streamerId, {
    $inc: { wallet: amount, totalDonations: amount },
  });
  res.status(201).json({ success: true, donation: createDonation });
});

// Get All Donation of a Streamer

const getAllDonation = catchAsyncError(async (req, res, next) => {
  const streamerId = req.params.id;

  // Fetch donations for the specified streamer
  const donations = await Donation.find({ streamer: streamerId });

  if (!donations || donations.length === 0) {
    return next(new ErrorHandler("Donations not found", 404));
  }

  // Aggregate donations by donator and calculate total donations per donator
  const donators = await Donation.aggregate([
    { $match: { streamer: new mongoose.Types.ObjectId(streamerId) } }, // Match donations for the given streamer
    {
      $group: {
        _id: "$donatorName", // Group by donator name
        totalDonated: { $sum: "$amount" }, // Sum up the donation amounts for each donator
      },
    },
    { $sort: { totalDonated: -1 } },
    { $limit: 10 },
  ]);

  res.status(200).json({
    success: true,
    donations,
    donators,
  });
});

// Get Donation By Id

const getDonationByid = catchAsyncError(async (req, res, next) => {
  const donationId = req.params.id;

  const donation = await Donation.findById(donationId);

  if (!donation) {
    return next(new ErrorHandler("Donation not found", 404));
  }

  res.status(200).json({ success: true, donation });
});

// Donation Stats

const getDonationStats = catchAsyncError(async (req, res, next) => {
  const streamerId = req.params.id;

  const stats = await Donation.aggregate([
    // Match donations for the specific streamer
    { $match: { streamer: new mongoose.Types.ObjectId(streamerId) } },

    // Group donations to calculate total donations, average donation, and donations per donator
    {
      $group: {
        _id: "$donatorName", // Group by donator name
        totalDonatedByUser: { $sum: "$amount" }, // Total donated by each donator
        count: { $sum: 1 }, // Count of donations (used to calculate avg)
      },
    },

    // Sort by total donated by donators to find the top donator
    { $sort: { totalDonatedByUser: -1 } },

    // Calculate total donations and average donation
    {
      $group: {
        _id: null,
        topDonator: { $first: "$_id" }, // Top donator (first in the sorted list)
        totalDonatedByTopDonator: { $first: "$totalDonatedByUser" }, // Amount donated by top donator
        totalDonations: { $sum: "$totalDonatedByUser" }, // Total donations across all donators
        averageDonation: { $avg: "$totalDonatedByUser" }, // Average donation per donator
      },
    },

    {
      $project: {
        _id: 0,
        topDonator: 1,
        totalDonatedByTopDonator: 1,
        totalDonations: 1,
        averageDonation: 1,
      },
    },
  ]);

  if (stats.length === 0) {
    return next(new ErrorHandler("Donation not found", 404));
  }

  // Return the stats
  res.status(200).json({
    success: true,
    donationsStats: {
      topDonator: stats[0].topDonator,
      totalDonatedByTopDonator: stats[0].totalDonatedByTopDonator,
      totalDonations: stats[0].totalDonations,
      averageDonation: stats[0].averageDonation,
    },
  });
});

const getCurrentWeek = () => {
  const currentDate = new Date();
  const startOfWeek = currentDate.getDate() - currentDate.getDay() + 1;
  const startDate = new Date(currentDate);
  startDate.setDate(startOfWeek);
  startDate.setUTCHours(0, 0, 0, 0);

  const endOfWeek = startOfWeek + 6;
  const endDate = new Date(currentDate);
  endDate.setDate(endOfWeek);
  endDate.setUTCHours(23, 59, 59, 999);

  return { startDate, endDate };
};

const getPreviousWeek = () => {
  const currentDate = new Date();
  const startOfPreviousWeek = currentDate.getDate() - currentDate.getDay() - 6;
  const startDate = new Date(currentDate);
  startDate.setDate(startOfPreviousWeek);
  startDate.setUTCHours(0, 0, 0, 0);

  const endOfPreviousWeek = startOfPreviousWeek + 6;
  const endDate = new Date(currentDate);
  endDate.setDate(endOfPreviousWeek);
  endDate.setUTCHours(23, 59, 59, 999);

  return { startDate, endDate };
};

const getWeekEarnings = catchAsyncError(async (req, res, next) => {
  const streamerId = new mongoose.Types.ObjectId(req.params.id);

  const currentWeekRange = getCurrentWeek();
  const previousWeekRange = getPreviousWeek();

  const currentWeekEarnings = await Donation.aggregate([
    {
      $match: {
        streamer: streamerId,
        createdAt: {
          $gte: currentWeekRange.startDate,
          $lte: currentWeekRange.endDate,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalEarnings: { $sum: "$amount" },
      },
    },
  ]);

  const previousWeekEarnings = await Donation.aggregate([
    {
      $match: {
        streamer: streamerId,
        createdAt: {
          $gte: previousWeekRange.startDate,
          $lte: previousWeekRange.endDate,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalEarnings: { $sum: "$amount" },
      },
    },
  ]);

  const currentTotal = currentWeekEarnings[0]?.totalEarnings || 0;
  const previousTotal = previousWeekEarnings[0]?.totalEarnings || 0;

  const difference = currentTotal - previousTotal;
  const status = difference >= 0 ? "rise" : "fall";

  res.status(200).json({
    success: true,
    earningStats: {
      currentWeekEarnings: currentTotal,
      previousWeekEarnings: previousTotal,
      difference: difference,
      percentageDifference:
        previousTotal > 0
          ? ((difference / previousTotal) * 100).toFixed(2)
          : 100,
      status: status,
    },
  });
});

// Get 1 Year Donations

const getYearDonations = catchAsyncError(async (req, res, next) => {
  const streamerId = new mongoose.Types.ObjectId(req.params.id);

  const currentDate = new Date();
  const twelveMonthsAgo = moment(currentDate)
    .subtract(11, "months")
    .startOf("month")
    .toDate();

  // Verify if donations exist in the date range before aggregating
  const donationsCheck = await Donation.find({
    streamer: streamerId,
    createdAt: {
      $gte: twelveMonthsAgo,
      $lte: currentDate,
    },
  });

  // Aggregation pipeline with filtering by streamer_id
  const donations = await Donation.aggregate([
    {
      $match: {
        streamer: streamerId, // Filter by the streamer_id
        createdAt: {
          $gte: twelveMonthsAgo, // Get donations from the last 12 months
          $lte: currentDate,
        },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" }, // Group by the 'createdAt' field
          month: { $month: "$createdAt" }, // Group by the 'createdAt' field
        },
        totalAmount: { $sum: "$amount" }, // Sum donations per month
      },
    },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        totalAmount: 1,
      },
    },
    { $sort: { year: 1, month: 1 } }, // Sort by year and month
  ]);

  // Initialize an object to hold donation data for each month
  const monthDonations = {
    jan: 0,
    feb: 0,
    mar: 0,
    apr: 0,
    may: 0,
    jun: 0,
    jul: 0,
    aug: 0,
    sep: 0,
    oct: 0,
    nov: 0,
    dec: 0,
  };

  // Map the aggregation results to the monthDonations object
  donations.forEach((donation) => {
    switch (donation.month) {
      case 1:
        monthDonations.jan += donation.totalAmount;
        break;
      case 2:
        monthDonations.feb += donation.totalAmount;
        break;
      case 3:
        monthDonations.mar += donation.totalAmount;
        break;
      case 4:
        monthDonations.apr += donation.totalAmount;
        break;
      case 5:
        monthDonations.may += donation.totalAmount;
        break;
      case 6:
        monthDonations.jun += donation.totalAmount;
        break;
      case 7:
        monthDonations.jul += donation.totalAmount;
        break;
      case 8:
        monthDonations.aug += donation.totalAmount;
        break;
      case 9:
        monthDonations.sep += donation.totalAmount;
        break;
      case 10:
        monthDonations.oct += donation.totalAmount;
        break;
      case 11:
        monthDonations.nov += donation.totalAmount;
        break;
      case 12:
        monthDonations.dec += donation.totalAmount;
        break;
      default:
        break;
    }
  });

  // Return the result with month names as keys
  res.status(200).json({ success: true, donations: monthDonations });
});

// Get Recent Donations
const getRecentDonations = catchAsyncError(async (req, res, next) => {
  const streamerId = req.params.id;

  // Fetch the last 10 donations for a specific streamer, sorted by most recent first
  const donations = await Donation.find({ streamer: streamerId })
    .sort({ createdAt: -1 }) // Sort by createdAt in descending order (-1)
    .limit(10); // Limit to the last 10 donations

  if (!donations || donations.length === 0) {
    return next(new ErrorHandler("No donations found", 404));
  }

  res.status(200).json({
    success: true,
    donations,
  });
});

export default {
  giveDonation,
  getAllDonation,
  getDonationByid,
  getDonationStats,
  getWeekEarnings,
  getYearDonations,
  getRecentDonations,
};
