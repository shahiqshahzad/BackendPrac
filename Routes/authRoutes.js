import express from "express";
import multer from "multer";
import {
  changePassword,
  getProfile,
  googleAuth,
  googleCallBack,
  updateProfile,
} from "../controllers/authController.js";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "uploads");
  },
  filename: (req, file, cd) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cd(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/getProfile", getProfile);
router.post("/updateProfile", upload.single("file"), updateProfile);
router.post(
  "/changepassword",
  body("password").notEmpty(),
  body("newpassword").notEmpty(),
  changePassword
);
router.get("/google", googleAuth);
router.get("/google/callback", googleCallBack);
export default router;
