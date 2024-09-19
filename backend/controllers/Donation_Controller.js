import mongoose from "mongoose";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Donation from "../models/Donation_Model.js";
import { ErrorHandler } from "../utils/error-handler.js";
import crypto from "node:crypto";

const merchantId = process.env.JAZZCASH_MERCHANT_ID;
const password = process.env.JAZZCASH_PASSWORD;
const integritySalt = process.env.JAZZCASH_INTEGRITY_SALT;
const returnUrl = "https://your-frontend-url.com/payment-callback"; // Your frontend callback URL

// Helper function to generate secure hash for payment
const generateSecureHash = (paymentData) => {
  const stringToHash = Object.values(paymentData)
    .filter((val) => val)
    .join("&");
  const secureHash = crypto
    .createHmac("sha256", integritySalt)
    .update(stringToHash)
    .digest("hex");
  return secureHash;
};
// Give Donation

const giveDonation = catchAsyncError(async (req, res, next) => {
  const { donatorName, amount, message } = req.body;
  const streamerId = req.params.id;

  // Ensure valid donation amount
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid donation amount." });
  }

  const orderId = `DONATION-${streamerId}-${Date.now()}`; // Generate unique order ID

  const transactionDate = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  // Prepare JazzCash payment data for MWALLET
  const paymentData = {
    pp_Version: "1.1",
    pp_TxnType: "MWALLET",
    pp_Language: "EN",
    pp_MerchantID: merchantId,
    pp_Password: password,
    pp_TxnRefNo: orderId,
    pp_Amount: amount * 100, // Amount in paisa (multiply by 100)
    pp_TxnCurrency: "PKR",
    pp_TxnDateTime: transactionDate,
    pp_TxnExpiryDateTime: new Date(Date.now() + 30 * 60000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " "), // 30 mins expiry
    pp_BillReference: "Donation",
    pp_Description: message || "Donation Payment",
    pp_ReturnURL: returnUrl, // Callback URL after payment
  };

  // Generate secure hash for the payment
  paymentData.pp_SecureHash = generateSecureHash(paymentData);

  try {
    // Call JazzCash API to initiate the MWALLET payment
    const response = await axios.post(
      "https://sandbox.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction",
      paymentData
    );

    if (response.data.pp_ResponseCode === "000") {
      // JazzCash payment initiated successfully
      res.status(200).json({
        success: true,
        paymentRedirectUrl: response.data.paymentRedirectUrl, // Send this URL to frontend to redirect user for payment
        message: "Donation initiated, redirecting to JazzCash for payment.",
      });
    } else {
      // Handle JazzCash payment initiation failure
      res.status(400).json({
        success: false,
        message: "Failed to initiate JazzCash payment.",
      });
    }
  } catch (error) {
    console.error("Error initiating JazzCash payment:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while initiating payment.",
    });
  }
});

// Get All Donation of a Streamer

const getAllDonation = catchAsyncError(async (req, res, next) => {
  const streamerId = req.params.id;

  const donations = await Donation.find({ streamer: streamerId });

  if (!donations) {
    return next(new ErrorHandler("Donation not found", 404));
  }
  res.status(200).json({ success: true, donations });
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
    topDonator: stats[0].topDonator,
    totalDonatedByTopDonator: stats[0].totalDonatedByTopDonator,
    totalDonations: stats[0].totalDonations,
    averageDonation: stats[0].averageDonation,
  });
});

export default {
  giveDonation,
  getAllDonation,
  getDonationByid,
  getDonationStats,
};
