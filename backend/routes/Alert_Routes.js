import alert_Controller from "../controllers/Alert_Controller.js";
import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import multer from "multer";
const router = express.Router();

const uploadImage = multer({ dest: "uploads/alertImages" });
const uploadAlertSound = multer({ dest: "uploads/alertSound" });
const uploadAudioAlerts = multer({ dest: "uploads/audioAlerts" });

router
  .route("/updatealertsettings")
  .patch(authMiddleware, alert_Controller.updateAlertSettings);
router
  .route("/updatealertimage")
  .patch(
    authMiddleware,
    uploadImage.single("alertImage"),
    alert_Controller.updateAlertImage
  );
router
  .route("/updatealertsound")
  .patch(
    authMiddleware,
    uploadAlertSound.single("alertSound"),
    alert_Controller.updateAlertSound
  );
router
  .route("/updateaudioalertsounds")
  .patch(
    authMiddleware,
    uploadAudioAlerts.single("soundFile"),
    alert_Controller.addAudioAlerts
  );

export default router;
