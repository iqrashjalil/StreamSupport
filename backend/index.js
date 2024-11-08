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
import bankdetailRoutes from "./routes/Bankdetail_Routes.js";
import alertRoutes from "./routes/Alert_Routes.js";
import contactRoutes from "./routes/Contact_Routes.js";
import path from "path";
import { fileURLToPath } from "url";
import setupSocket from "./socket.js";
import http from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

const io = setupSocket(server);
app.set("io", io);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    origin: "https://stereamsupport.netlify.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/withdraw", withdrawRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/bankdetail", bankdetailRoutes);
app.use("/api/alert", alertRoutes);
app.use("/api/contact", contactRoutes);

server.listen(PORT, () => {
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

// Reference the static files from the client build directory

app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all route to serve the index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname1, "../frontend/dist", "index.html"));
});
app.use(errorMiddleware);

export default app;
