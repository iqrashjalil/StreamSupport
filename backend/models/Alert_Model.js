import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  streamer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  overlayLink: {
    type: String,
  },
  superchatLink: {
    type: String,
  },
  alertSound: {
    type: String,
  },
  alertImage: {
    type: String,
  },
  alertAnimation: {
    type: String,
  },
  textAnimation: {
    type: String,
  },
  fontStyle: {
    type: String,
  },
  alertDuration: {
    type: Number,
    default: 10,
  },
  textToSpeechALert: {
    type: Boolean,
    default: true,
  },
  speechVolume: {
    type: Number,
    default: 50,
  },
  minMoneyForAlert: {
    type: Number,
    default: 50,
  },
  minMoneyForMessage: {
    type: Number,
    default: 50,
  },
  audioAlerts: [
    {
      title: {
        type: String,
      },
      soundFile: {
        type: String,
      },
      money: {
        type: Number,
      },
    },
  ],
  audioAlertAnimation: {
    type: String,
  },
  audioAlertVolume: {
    type: Number,
    default: 50,
  },
});

const alertSettings = mongoose.model("alertSettings", alertSchema);

export default alertSettings;