import asyncHanlder from "express-async-handler";
import Product from "../model/ProductModel.js";

// @desc Get products & get {page and limit} from query params with pagination
// @route Get/api/product
// @access Public
const getProducts = asyncHanlder(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const product = await Product.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("adminPost", "firstName email lastName");
  res.json(product);
});

const addProduct = asyncHanlder(async (req, res) => {
  res.send("hy");
});
export { getProducts, addProduct };
