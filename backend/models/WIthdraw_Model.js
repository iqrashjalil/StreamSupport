import mongoose from "mongoose";

const withdrawSchema = new mongoose.Schema({
  streamer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  withdrawAmount: {
    type: Number,
    required: true,
  },
  bankDetails: {
    type: String,
    required: [true, "Please Enter Bank Details"],
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  rejectReason: {
    type: String,
    validate: {
      validator: function (v) {
        return this.status !== "Rejected" || (v && v.length > 0);
      },
      message: "Reject reason is required when status is Rejected",
    },
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
  approvedAt: {
    type: Date,
    validate: {
      validator: function (v) {
        return this.status !== "Approved" || v;
      },
      message: "ApprovedAt is required when status is Approved",
    },
  },
  rejectedAt: {
    type: Date,
    validate: {
      validator: function (v) {
        return this.status !== "Rejected" || v;
      },
      message: "RejectedAt is required when status is Rejected",
    },
  },
});

const Withdraw = mongoose.model("Withdraw", withdrawSchema);

export default Withdraw;
