import express from "express";
import { body } from "express-validator";
import { verifyCategory } from "../controllers/productController.js";

const router = express.Router();

router.post(
  "/verifyCategory",
  body("categoryId").notEmpty().isMongoId(),
  verifyCategory
);

export default router;
