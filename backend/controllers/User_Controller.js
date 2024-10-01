import User from "../models/User_Model.js";
import alertSettings from "../models/Alert_Model.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../utils/error-handler.js";
import sendToken from "../utils/jwtToken.js";
import bcrypt from "bcrypt";
import { renameSync, unlinkSync } from "fs";

// Register Controller

const register = catchAsyncError(async (req, res, next) => {
  const { userName, email, password } = req.body;
  if (!req.file) {
    return next(new ErrorHandler("Please upload an image", 400));
  }
  console.log(req.body);

  const date = Date.now();
  let fileName = "uploads/profiles/" + date + req.file.originalname;

  renameSync(req.file.path, fileName);
  if (!userName || !email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(new ErrorHandler("User already exists", 400));
  }
  const user = new User({
    userName,
    email,
    password,
    profilePic: fileName, // Make sure to hash the password before saving
  });

  const defaultAlertSettings = new alertSettings({
    streamer: user._id,
    overlayLink: `https://www.localhost:5173/overlay/${user._id}`,
    superchatLink: `https://www.localhost:5173/supechat/${user._id}`,
  });

  const savedAlertSettings = await defaultAlertSettings.save();

  user.alertSettings = savedAlertSettings._id;
  await user.save();

  sendToken(user, 201, res);
});

// Login Controller

const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// Logout

const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
    .json({ success: true, user: null, message: "Logged Out Successfully" });
});

// Get Loggedin user

const getUser = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId).populate("alertSettings");
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({ success: true, user });
});

// Update Profile

const updateProfile = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const { userName, email, password } = req.body;

  // Object to store fields to update
  const updateFields = {};

  // Conditionally add fields only if they are non-empty
  if (userName) updateFields.userName = userName;
  if (email) updateFields.email = email; // Only update email if it's non-empty
  if (password) {
    updateFields.password = await bcrypt.hash(password, 10);
  }
  // Handle profile picture if provided
  if (req.file) {
    try {
      const date = Date.now();
      const fileName = "uploads/profiles/" + date + req.file.originalname;
      renameSync(req.file.path, fileName);
      updateFields.profilePic = fileName;
    } catch (error) {
      return next(new ErrorHandler("Error uploading profile picture", 500));
    }
  }

  // Update the user in the database
  const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
    new: true, // Return the updated document
  });

  if (!updatedUser) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Respond with the updated user
  res.status(200).json({
    success: true,
    user: updatedUser,
  });
});

// Delete User

const deleteUser = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({ success: true, user: deletedUser });
});

// Get All Users

const getAllUsers = catchAsyncError(async (req, res, next) => {
  const { searchQuery, page = 1 } = req.query; // Get search query and page from request params

  // Set default limit to 10 users per page
  const limit = 10;
  const skip = (page - 1) * limit;

  // Search by name, email, or any other field
  let query = {};

  if (searchQuery) {
    query = {
      $or: [
        { name: { $regex: searchQuery, $options: "i" } }, // case-insensitive search
        { email: { $regex: searchQuery, $options: "i" } }, // search by email as well
      ],
    };
  }

  // Fetch users based on the search query or pagination
  const users = await User.find(query).skip(skip).limit(limit);

  // Total user count for lazy loading purposes
  const totalUsers = await User.countDocuments(query);

  res.status(200).json({
    success: true,
    users,
    totalUsers, // Useful for frontend to determine if more users need to be loaded
    page,
    totalPages: Math.ceil(totalUsers / limit),
  });
});

const getTopStreamers = catchAsyncError(async (req, res, next) => {
  const userId = req.params.id;

  const streamers = await User.find({ role: "streamer" }).sort({
    totalDonations: -1,
  });

  res.status(200).json({ success: true, topStreamers: streamers });
});

export default {
  register,
  login,
  getUser,
  logout,
  updateProfile,
  deleteUser,
  getAllUsers,
  getTopStreamers,
};
