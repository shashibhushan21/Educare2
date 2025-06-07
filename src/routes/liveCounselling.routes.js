import { Router } from 'express';
import { submitLiveCounselling } from "../controllers/liveCounselling.controller.js";

const router = Router();

router.route("/submit").post(submitLiveCounselling);

export default router;