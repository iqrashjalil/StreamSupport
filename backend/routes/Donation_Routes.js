import Donation_Controller from "../controllers/Donation_Controller.js";
import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.route("/givedonation/:id").post(Donation_Controller.giveDonation);
router.route("/getalldonations/:id").get(Donation_Controller.getAllDonation);
router.route("/getdonationbyid/:id").get(Donation_Controller.getDonationByid);
router.route("/getdonationstats/:id").get(Donation_Controller.getDonationStats);
export default router;
