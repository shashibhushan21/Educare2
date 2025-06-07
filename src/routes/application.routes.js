import { Router } from 'express';
import { submitApplication } from "../controllers/application.controller.js";

const router = Router();

router.route("/submit").post(submitApplication);

export default router;