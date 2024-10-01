import mongoose from "mongoose";

const bankdetailsSchema = new mongoose.Schema({
  streamer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  accountTitle: {
    type: String,
    required: true,
  },
  cnic: {
    type: Number,
    required: [true, "Please enter CNIC number"],
    maxlength: [13, "CNIC cannot exceed 13-Numbers"],
    validate: {
      validator: function (v) {
        return /^[0-9]{13}$/.test(v);
      },
      message: "CNIC should exactly match 13 Numbers",
    },
  },
});

const Bankdetail = mongoose.model("Bankdetail", bankdetailsSchema);

export default Bankdetail;
