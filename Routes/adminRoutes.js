import express from "express";
import { body } from "express-validator";
import { upload } from "../utils/upload.js";
import {
  addCategory,
  addProduct,
  getCateogries,
  removeCategory,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();
router.post(
  "/product",
  upload.single("file"),
  [
    body("name").notEmpty(),
    body("description").notEmpty(),
    body("price").notEmpty().isFloat(),
    body("stock").notEmpty().isInt(),
    body("categoryId").notEmpty().isMongoId(),
  ],
  addProduct
);
router.post(
  "/addCategory",
  upload.single("file"),
  [body("name").notEmpty()],
  addCategory
);
router.post("/updateProduct/:productId", updateProduct);
router.get("/getCategories", getCateogries);
router.delete("/removeCateogry/:categoryId", removeCategory);

export default router;
