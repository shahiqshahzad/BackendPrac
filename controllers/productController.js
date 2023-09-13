import asyncHanlder from "express-async-handler";
import Product from "../model/ProductModel.js";
import { validationResult } from "express-validator";
import User from "../model/UserModel.js";
import Category from "../model/CategoryModel.js";

// @desc Get products & get {page and limit} from query params with pagination
// @route Get/product
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

// @desc Product detail and get id from params
// @route Get/product/productId
// @access Public
const productDetail = asyncHanlder(async (req, res) => {
  const { id } = req.params;
  const findOne = await Product.findById(id).populate(
    "adminPost",
    "firstName email lastName profileImage"
  );
  console.log(findOne);
  res.send(id);
});

const addProduct = asyncHanlder(async (req, res) => {
  const { name, description, price, stock } = req.body;
  const { errors } = validationResult(req);
  if (errors.length !== 0) {
    const pickError = errors[0];
    throw new Error(`${pickError.path} ${pickError.msg}`);
  } else {
    const checkUser = await User.findById(req.userData._id);
    if (!checkUser) {
      throw new Error("Admin not found");
    }
    if (!req.file) {
      throw new Error("Please add product image file");
    }

    const baseUrl = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    const addProduct = new Product({
      name,
      description,
      price,
      stock,
      adminPost: checkUser._id,
      productImage: baseUrl,
    });
    await addProduct.save();
    res.status(201);
    res.send("Product successfully added");
  }
});

const addCategory = asyncHanlder(async (req, res) => {
  const { name } = req.body;
  const { errors } = validationResult(req);
  if (errors.length !== 0) {
    const pickError = errors[0];
    throw new Error(`${pickError.path} ${pickError.msg}`);
  } else {
    const checkUser = await User.findById(req.userData._id);
    if (!checkUser) {
      throw new Error("Admin not found");
    }
    if (!req.file) {
      res.status(404);
      throw new Error("Please add category Image");
    }
    const baseUrl = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    const addCategory = new Category({
      name,
      adminPost: checkUser._id,
      categoryImage: baseUrl,
    });
    await addCategory.save();
    res.status(201);
    res.send("Category added successfully");
  }
});
export { getProducts, productDetail, addProduct, addCategory };
