import asyncHanlder from "express-async-handler";
import Product from "../model/ProductModel.js";
import { validationResult } from "express-validator";

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

// @desc Add product
// @route Post/api/product
// @acess private admin only
const addProduct = asyncHanlder(async (req, res) => {
  const { name, description, price, stock } = req.body;
  const { errors } = validationResult(req);
  if (errors.length !== 0) {
    const pickError = errors[0];
    throw new Error(`${pickError.path} ${pickError.msg}`);
  }
  if (req.file) {
    const { orignalname, filename, path } = req.file;
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const product = new Product({
      name,
      description,
      price,
      stock,
      productImage: `${baseUrl}/${path}`,
      adminPost: req.userData._id,
    });
    await product.save();
    res.send("product Add Successfully");
  } else {
    throw new Error("please add Image");
  }
});

export { getProducts, addProduct };
