import express from "express";
import { addProduct } from "../controllers/productController.js";
import { body } from "express-validator";
import { upload } from "../utils/upload.js";

const router = express.Router();
router.post(
  "/product",
  upload.single("file"),
  [
    body("name").notEmpty(),
    body("description").notEmpty(),
    body("price").notEmpty().isFloat(),
    body("stock").notEmpty().isInt(),
  ],
  addProduct
);

export default router;
