import Bankdetail_Controller from "../controllers/Bankdetail_Controller.js";
import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/auth-middleware.js";

const router = express.Router();

router
  .route("/addbankdetail")
  .post(authMiddleware, Bankdetail_Controller.addBankDetails);
router
  .route("/getbankdetail")
  .get(authMiddleware, Bankdetail_Controller.getBankDetails);
router
  .route("/deletebankdetail/:id")
  .delete(authMiddleware, Bankdetail_Controller.deleteBankdetail);

export default router;
