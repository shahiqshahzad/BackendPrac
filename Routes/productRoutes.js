import express from "express";
import {
  getProducts,
  productDetail,
} from "../controllers/productController.js";

const router = express.Router();

router.get("", getProducts);
router.get("/:id", productDetail);

export default router;
