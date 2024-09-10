import User from "../models/User_Model.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../utils/error-handler.js";
import sendToken from "../utils/jwtToken.js";

// Register Controller

const register = catchAsyncError(async (req, res, next) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(new ErrorHandler("User already exists", 400));
  }
  const user = await User.create({
    userName,
    email,
    password,
  });

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
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({ success: true, user });
});

// Update Profile

const updateProfile = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const updatedFields = req.body;
  const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
    new: true,
  });
  if (!updatedUser) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({ success: true, user: updatedUser });
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

export default {
  register,
  login,
  getUser,
  logout,
  updateProfile,
  deleteUser,
  getAllUsers,
};
