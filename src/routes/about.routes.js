import { Router } from 'express';
import { submitAboutForm } from "../controllers/about.controller.js";

const router = Router();

router.route("/submit").post(submitAboutForm);

export default router;