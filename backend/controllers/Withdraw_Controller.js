import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Withdraw from "../models/WIthdraw_Model.js";
import { ErrorHandler } from "../utils/error-handler.js";
import User from "../models/User_Model.js";
// Request Withdraw

const addWithdrawReuest = catchAsyncError(async (req, res, next) => {
  const { withdrawAmount, cnic, bankName, accountTitle, bankAccountNumber } =
    req.body;

  const streamerId = req.user._id;

  if (
    !withdrawAmount ||
    !bankName ||
    !accountTitle ||
    !cnic ||
    !bankAccountNumber
  ) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  if (withdrawAmount > req.user.wallet) {
    return next(new ErrorHandler("Insufficient Balance", 400));
  }
  const withdraw = await Withdraw.create({
    streamer: streamerId,
    withdrawAmount,
    cnic,
    bankName,
    accountTitle,
    bankAccountNumber,
  });

  await User.findByIdAndUpdate(
    streamerId,
    { $inc: { wallet: -withdrawAmount } },
    { new: true }
  );

  res.status(201).json({ success: true, withdraw });
});

// Get All Withdraw Requests

const getAllWithdrawRequests = catchAsyncError(async (req, res, next) => {
  const { page = 1 } = req.query; // Get search query and page from request params

  // Set default limit to 10 users per page
  const limit = 10;
  const skip = (page - 1) * limit;

  const withdraws = await Withdraw.find()
    .skip(skip)
    .limit(limit)
    .populate("streamer");

  const totalWithdraws = await Withdraw.countDocuments();
  const pendingRequests = await Withdraw.find({ status: "Pending" });
  res.status(200).json({
    success: true,
    totalWithdraws: totalWithdraws,
    pendingRequests: pendingRequests.length,
    totalPages: Math.ceil(totalWithdraws / limit),
    withdraws: withdraws,
  });
});

// Approve Withdraw Request

const updateWithdrawRequest = catchAsyncError(async (req, res, next) => {
  const withdrawId = req.params.id;
  const { status, rejectReason } = req.body;

  // Ensure status is either "Approved" or "Rejected"
  if (!["Approved", "Rejected", "Pending"].includes(status)) {
    return next(new ErrorHandler("Invalid status provided", 400));
  }

  let updateFields = {};

  if (status === "Approved") {
    updateFields = {
      status: "Approved",
      approvedAt: Date.now(),
    };
  } else if (status === "Rejected") {
    if (!rejectReason) {
      return next(
        new ErrorHandler("Reject reason is required for Rejected status", 400)
      );
    }
    updateFields = {
      status: "Rejected",
      rejectedAt: Date.now(),
      rejectReason,
    };
  }

  // Update the withdraw request
  const withdraw = await Withdraw.findByIdAndUpdate(withdrawId, updateFields, {
    new: true,
  });

  if (!withdraw) {
    return next(new ErrorHandler("Withdraw request not found", 404));
  }

  res.status(200).json({ success: true, message: "Status Updated" });
});

// Get Withdraw Request with Id:

const getWithdrawRequest = catchAsyncError(async (req, res, next) => {
  const withdrawId = req.params.id;

  const withdraw = await Withdraw.findById(withdrawId);

  if (!withdraw) {
    return next(new ErrorHandler("Withdraw request not found", 404));
  }

  res.status(200).json({ success: true, withdraw });
});

// Delete WIthdraw Request

const deleteWithdrawRequest = catchAsyncError(async (req, res, next) => {
  const withdrawId = req.params.id;

  const withdraw = await Withdraw.findByIdAndDelete(withdrawId);

  if (!withdraw) {
    return next(new ErrorHandler("Withdraw request not found", 404));
  }

  res.status(200).json({ success: true, message: "Withdraw Reuest Deleted" });
});

// Get Withdraw history for logged In user

const getWithdrawHistory = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;

  const withdraws = await Withdraw.find({ streamer: userId });

  if (!withdraws) {
    return next(new ErrorHandler("Withdraw request not found", 404));
  }
  res.status(200).json({ success: true, withdraws });
});

export default {
  addWithdrawReuest,
  getAllWithdrawRequests,
  updateWithdrawRequest,
  getWithdrawRequest,
  deleteWithdrawRequest,
  getWithdrawHistory,
};
