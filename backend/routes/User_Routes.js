import User_Controller from "../controllers/User_Controller.js";
import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/auth-middleware.js";
import multer from "multer";
const router = express.Router();

const upload = multer({ dest: "uploads/profiles" });

router
  .route("/register")
  .post(upload.single("profilePic"), User_Controller.register);
router.route("/login").post(User_Controller.login);
router.route("/getuser").get(authMiddleware, User_Controller.getUser);
router.route("/logout").post(User_Controller.logout);
router
  .route("/updateprofile")
  .patch(
    authMiddleware,
    upload.single("profilePic"),
    User_Controller.updateProfile
  );
router.route("/deleteprofile").delete(
  authMiddleware,

  User_Controller.deleteUser
);
router
  .route("/getallusers")
  .get(authMiddleware, isAdmin, User_Controller.getAllUsers);
router.route("/gettopstreamers").get(User_Controller.getTopStreamers);
export default router;
