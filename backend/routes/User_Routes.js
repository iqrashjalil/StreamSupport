import User_Controller from "../controllers/User_Controller.js";
import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.route("/register").post(User_Controller.register);
router.route("/login").post(User_Controller.login);
router.route("/getuser").get(authMiddleware, User_Controller.getUser);
router.route("/logout").post(authMiddleware, User_Controller.logout);
router
  .route("/updateprofile")
  .patch(authMiddleware, User_Controller.updateProfile);
router
  .route("/deleteprofile")
  .delete(authMiddleware, User_Controller.deleteUser);
router
  .route("/getallusers")
  .get(authMiddleware, isAdmin, User_Controller.getAllUsers);
export default router;
