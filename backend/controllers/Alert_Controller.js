import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import alertSettings from "../models/Alert_Model.js";
import { ErrorHandler } from "../utils/error-handler.js";
import { renameSync, unlinkSync } from "fs";

// Update Alert Settings

const updateAlertSettings = catchAsyncError(async (req, res, next) => {
  const streamerId = req.user._id;
  const updatedFields = req.body;

  const newAlertSettings = await alertSettings.findOneAndUpdate(
    { streamer: streamerId },
    updatedFields,
    { new: true }
  );
  if (!newAlertSettings) {
    return next(new ErrorHandler("Alert settings not found", 404));
  }
  res.status(200).json({ success: true, newAlertSettings });
});

// Update Image in Alert

const updateAlertImage = catchAsyncError(async (req, res, next) => {
  const streamerId = req.user._id;
  if (!req.file) {
    return next(new ErrorHandler("Please upload an image", 400));
  }

  const date = Date.now();
  let fileName = "uploads/alertImages/" + date + req.file.originalname;

  renameSync(req.file.path, fileName);
  const newAlertSettings = await alertSettings.findOneAndUpdate(
    { streamer: streamerId },
    { alertImage: fileName },
    { new: true }
  );

  if (!newAlertSettings) {
    return next(new ErrorHandler("Alert settings not found", 404));
  }

  res.status(200).json({ success: true, newAlertSettings });
});

// Update Alert Sound

const updateAlertSound = catchAsyncError(async (req, res, next) => {
  const streamerId = req.user._id;
  if (!req.file) {
    return next(new ErrorHandler("Please upload an audio file", 400));
  }

  const date = Date.now();
  let fileName = "uploads/alertSound/" + date + req.file.originalname;

  renameSync(req.file.path, fileName);
  const newAlertSettings = await alertSettings.findOneAndUpdate(
    { streamer: streamerId },
    { alertSound: fileName },
    { new: true }
  );

  if (!newAlertSettings) {
    return next(new ErrorHandler("Alert settings not found", 404));
  }

  res.status(200).json({ success: true, newAlertSettings });
});

// Add Audio Alerts

const addAudioAlerts = catchAsyncError(async (req, res, next) => {
  const streamerId = req.user._id;
  if (!req.file) {
    return next(new ErrorHandler("Please upload an audio file", 400));
  }

  const date = Date.now();
  let fileName = "uploads/audioAlerts/" + date + req.file.originalname;

  renameSync(req.file.path, fileName);

  const audioAlertData = {
    title: req.body.title,
    soundFile: fileName,
    money: req.body.money,
  };

  const newAlertSettings = await alertSettings.findOneAndUpdate(
    { streamer: streamerId },
    { $push: { audioAlerts: audioAlertData } },
    { new: true }
  );
  if (!newAlertSettings) {
    return next(new ErrorHandler("Alert settings not found", 404));
  }

  res.status(200).json({ success: true, newAlertSettings });
});

export default {
  updateAlertSettings,
  updateAlertImage,
  updateAlertSound,
  addAudioAlerts,
};
