import ContactController from "../controllers/Contact-Controller.js";
import { Router } from "express";

const router = Router();

router.route("/addcontact").post(ContactController.addContact);

router.route("/deletecontact/:id").delete(ContactController.deleteContact);

export default router;
