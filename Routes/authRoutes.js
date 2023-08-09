import express from "express";
import { accountAuth } from "../controllers/authController.js";
import jwt from "jsonwebtoken";
import authVerification from "../middleware/auth.js";

const router = express.Router();
router.post("/account", accountAuth);

export default router;
