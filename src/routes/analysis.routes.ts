import { Router } from "express";
import { analyzeResume } from "../controllers/analysis.controller.js";
import { upload } from "../middleware/upload.middleware.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.post("/analyze", authenticate, upload.single("resume"), analyzeResume as any);

export default router;
