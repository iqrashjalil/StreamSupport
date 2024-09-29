import withdraw_Controller from "../controllers/Withdraw_Controller.js";
import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/auth-middleware.js";

const router = express.Router();

router
  .route("/addwithdrawrequest")
  .post(authMiddleware, withdraw_Controller.addWithdrawReuest);

router
  .route("/getallwithdrawrequests")
  .get(authMiddleware, isAdmin, withdraw_Controller.getAllWithdrawRequests);

router
  .route("/updatewithdrawrequest/:id")
  .patch(authMiddleware, isAdmin, withdraw_Controller.updateWithdrawRequest);

router
  .route("/getwithdrawrequest/:id")
  .get(authMiddleware, withdraw_Controller.getWithdrawRequest);

router
  .route("/deletewithdrawrequest/:id")
  .delete(authMiddleware, withdraw_Controller.deleteWithdrawRequest);

router
  .route("/getuserwithdrawrequests")
  .get(authMiddleware, withdraw_Controller.getWithdrawHistory);

export default router;
