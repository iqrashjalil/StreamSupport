import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Bankdetail from "../models/Bankdetail_Model.js";
import { ErrorHandler } from "../utils/error-handler.js";

// Add bank details

const addBankDetails = catchAsyncError(async (req, res, next) => {
  const { bankName, accountNumber, accountTitle, cnic } = req.body;
  const streamerId = req.user._id;

  if (!bankName || !accountNumber || !accountTitle || !cnic) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const bankdetail = await Bankdetail.create({
    streamer: streamerId,
    bankName,
    accountNumber,
    accountTitle,
    cnic,
  });
  res.status(201).json({ success: true, message: "Bank Details Added" });
});

// Get bank details

const getBankDetails = catchAsyncError(async (req, res, next) => {
  const streamerId = req.user._id;

  const bankdetail = await Bankdetail.find({ streamer: streamerId });

  if (!bankdetail) {
    return next(new ErrorHandler("Bank details not found", 404));
  }

  res.status(200).json({ success: true, bankdetail });
});

const deleteBankdetail = catchAsyncError(async (req, res, next) => {
  const bankDetailId = req.params.id;
  const deletedBankDetail = await Bankdetail.findByIdAndDelete(bankDetailId);
  if (!deletedBankDetail) {
    return next(new ErrorHandler("Bank detail not found", 404));
  }
  res.status(200).json({ success: true, message: "Bank Detail Deleted" });
});

export default { addBankDetails, getBankDetails, deleteBankdetail };
