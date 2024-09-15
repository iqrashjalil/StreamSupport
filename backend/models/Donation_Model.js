import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  streamer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  donatorName: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
  },
  transactionStatus: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
