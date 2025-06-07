import { Router } from 'express';
import { submitContact } from "../controllers/contact.controller.js";

const router = Router();

router.route("/submit").post(submitContact);

export default router;