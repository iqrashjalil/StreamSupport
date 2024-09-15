import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import errorMiddleware from "./middlewares/error-middleware.js";
import userRoutes from "./routes/User_Routes.js";
import withdrawRoutes from "./routes/Withdraw_Routes.js";
import donationRoutes from "./routes/Donation_Routes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/withdraw", withdrawRoutes);
app.use("/api/donation", donationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_COMPASS);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};

connectDB();

app.use(errorMiddleware);

export default app;
