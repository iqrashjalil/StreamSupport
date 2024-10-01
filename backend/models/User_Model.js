import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please Enter A Name"],
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [50, "Username cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter A Valid Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter A Valid Password"],
    minlength: [6, "Password must be at least 6 characters long"],
    maxlength: [20, "Password cannot exceed 20 characters"],
  },
  wallet: {
    type: Number,
    default: 0,
  },
  totalDonations: {
    type: Number,
    default: 0,
  },
  profilePic: {
    type: String,
    required: [true, "Please Upload Your Profile Pic"],
  },
  role: {
    type: String,
    enum: ["admin", "streamer"],
    default: "streamer",
  },
  alertSettings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "alertSettings",
  },
});

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // If password is not modified, skip this part
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, saltRound);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate JWT token
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

const User = mongoose.model("User", userSchema);

export default User;
