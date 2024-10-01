import mongoose from "mongoose";

const withdrawSchema = new mongoose.Schema({
  streamer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  withdrawAmount: {
    type: Number,
    required: true,
  },
  cnic: {
    type: Number,
    required: [true, "Please Enter CNIC Number"],
    maxlength: [13, "CNIC cannot exceed 13 characters"],
    validate: {
      validator: function (v) {
        // Check if the CNIC has exactly 13 numeric characters
        return /^[0-9]{13}$/.test(v); // Adjust this if you allow hyphens
      },
      message: "CNIC cannot exceed 13 numbers",
    },
  },
  bankName: {
    type: String,
    required: [true, "Please Enter Bank Name"],
  },
  accountTitle: {
    type: String,
    required: [true, "Please Enter Bank Account Title"],
  },
  bankAccountNumber: {
    type: String,
    required: [true, "Please Enter Bank Account Number"],
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
