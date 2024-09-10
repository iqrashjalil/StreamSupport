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

export default { register };
