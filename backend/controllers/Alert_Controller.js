import mongoose from "mongoose";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import alertSettings from "../models/Alert_Model.js";
import { ErrorHandler } from "../utils/error-handler.js";
import { renameSync, unlinkSync } from "fs";
import fs from "fs";

// Update Alert Settings

const updateAlertSettings = catchAsyncError(async (req, res, next) => {
  const streamerId = req.user._id;
  const updatedFields = req.body;

  const newAlertSettings = await alertSettings.findOneAndUpdate(
    { streamer: streamerId },
    updatedFields,
    { new: true }
  );
  if (updatedFields.minMoneyForAlert > 30) {
    return next(
      new ErrorHandler("Minimum money for alert should be less than 30", 400)
    );
  }
  if (updatedFields.minMoneyForMessage > 50) {
    return next(
      new ErrorHandler("Minimum money for alert should be less than 30", 400)
    );
  }
  if (!newAlertSettings) {
    return next(new ErrorHandler("Alert settings not found", 404));
  }
  res.status(200).json({ success: true, message: "Alert Settings Updated" });
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

  res.status(200).json({ success: true, message: "Alert Image Updated" });
});

// Update Alert Sound

const updateAlertSound = catchAsyncError(async (req, res, next) => {
  const streamerId = req.user._id;
  let userName = req.user.userName; // Assuming you have the username available in req.user
  userName = userName.replace(/\s+/g, "_");
  if (!req.file) {
    return next(new ErrorHandler("Please upload an audio file", 400));
  }

  const filePath = `uploads/alertSound/${userName}/alertSound.${
    req.file.mimetype.split("/")[1]
  }`; // Extracting file extension from mimetype

  // Ensure the directory exists, create it if necessary
  fs.mkdirSync(`uploads/alertSound/${userName}`, { recursive: true });

  // Move and rename the file
  renameSync(req.file.path, filePath);

  const newAlertSettings = await alertSettings.findOneAndUpdate(
    { streamer: streamerId },
    { alertSound: filePath },
    { new: true }
  );

  if (!newAlertSettings) {
    return next(new ErrorHandler("Alert settings not found", 404));
  }

  res.status(200).json({ success: true, message: "Alert Sound Updated " });
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

  res.status(200).json({ success: true, message: "Audio Alert Uploaded" });
});

// Update Audio Alert

const updateAudioAlert = catchAsyncError(async (req, res, next) => {
  const streamerId = req.user._id;
  const audioAlertId = req.params.id;

  const updatedAudioAlertData = req.body;

  const updatedAlertSettings = await alertSettings.findOneAndUpdate(
    { streamer: streamerId, "audioAlerts._id": audioAlertId },
    { $set: { "audioAlerts.$": updatedAudioAlertData } },
    { new: true }
  );

  if (!updatedAlertSettings) {
    return next(new ErrorHandler("Alert settings not found", 404));
  }

  res.status(200).json({ success: true, message: "Audio Alert Updated" });
});

// Delete Aduio Alert

const deleteAudioAlert = catchAsyncError(async (req, res, next) => {
  const streamerId = req.user._id;
  const audioAlertId = req.params.id;
  const objectId = new mongoose.Types.ObjectId(audioAlertId);
  const updatedAlertSettings = await alertSettings.findOneAndUpdate(
    { streamer: streamerId },
    { $pull: { audioAlerts: { _id: objectId } } },
    { new: true }
  );

  if (!updatedAlertSettings) {
    return next(new ErrorHandler("Alert settings not found", 404));
  }

  res.status(200).json({ success: true, message: "Audio Alert Deleted" });
});

const getAlertSettings = catchAsyncError(async (req, res, next) => {
  const streamerId = req.params.id;

  // Check if streamerId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(streamerId)) {
    return next(new ErrorHandler("Invalid streamer ID", 400));
  }

  const getAlertSettingsDocument = await alertSettings.findOne({
    streamer: streamerId,
  });

  if (!getAlertSettingsDocument) {
    return next(new ErrorHandler("Alert settings not found", 404));
  }

  res.status(200).json({ success: true, getAlertSettingsDocument });
});

export default {
  updateAlertSettings,
  updateAlertImage,
  updateAlertSound,
  addAudioAlerts,
  updateAudioAlert,
  deleteAudioAlert,
  getAlertSettings,
};
