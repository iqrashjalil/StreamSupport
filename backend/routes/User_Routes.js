import User_Controller from "../controllers/User_Controller.js";
import express from "express";

const router = express.Router();

router.route("/register").post(User_Controller.register);

export default router;
