const e = require("express");
const productModel = require("../models/productModel");
const orderModel = require("../models/orderModel");

const createProduct = async (req, res, next) => {
  try {
    const newProduct = await productModel.create(req.body);
    return res.status(200).json({ message: newProduct });
  } catch (error) {
    next(error);
  }
};
const reduceQuantityOfProduct = async (req, res, next) => {
  // const {
  //   item: [{ buyQuantity, product }],
  // } = req.body;

  // try {
  //   await productModel.findByIdAndUpdate(
  //     product,
  //     {
  //       $inc: { quantity: -buyQuantity },
  //     },
  //     {
  //       new: true,
  //       returnDocument: true,
  //     }
  //   );
  res.status(200).json({ message: "transaction successfull", success: true });
};

const getProduct = async (req, res, next) => {
  let products;
  try {
    if (Object.entries(req.query).length > 0) {
      products = await productModel.find({ ...req.query });
    } else {
      products = await productModel.find({});
    }
    return res.status(200).json({ message: products, success: true });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      { _id: productId },
      {
        $set: req.body,
      },
      {
        returnDocument: true,
        new: true,
      }
    );
    return res.status(200).json({ message: updatedProduct, success: true });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;
  try {
    await productModel.deleteOne({ _id: productId });
    return res
      .status(200)
      .json({ message: "successfully deleted", success: true });
  } catch (error) {
    next(error);
  }
};

const searchProduct = async (req, res, next) => {
  try {
    const searchedProducts = await productModel.find({
      $or: [
        {
          name: { $regex: req.query.search_query, $options: "i" },
        },
        { category: { $regex: req.query.search_query, $options: "i" } },
        { category: { $regex: req.query.search_query, $options: "i" } },
        { tags: { $in: [new RegExp(req.query.search_query, "i")] } },
      ],
    });
    res.status(200).json({ message: searchedProducts, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error, success: false });
  }
};

const getAppStats = async (req, res, next) => {
  try {
    const ProductCount = await productModel.find({}).count();
    const OrdersCount = await orderModel.find({}).count();
    const TotalSales = await orderModel.aggregate([
      {
        $group: {
          _id: null,
          grandTotal: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    res.status(200).json({
      message: {
        product: ProductCount,
        order: OrdersCount,
        sale: TotalSales[0].grandTotal,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const categories = await productModel.distinct("category");
    res.status(200).json({ message: categories, success: true });
  } catch (error) {
    next(error);
  }
};

const findProducts = async (req, res, next) => {
  const { min, max, category } = req.query;
  let products;
  try {
    if (category && !Number(min)) {
      products = await productModel.find({ category });
    } else if (!category && Number(min)) {
      products = await productModel.find({
        $and: [
          {
            price: { $gt: Number(min) },
          },
          {
            price: { $lt: Number(max) },
          },
        ],
      });
    } else {
      products = await productModel.find({});
    }
    return res.json({ message: products, success: true });
  } catch (error) {
    next(error);
  }
};

const getBestSellingsProduct = async (req, res, next) => {
  try {
    const topProducts = await productModel.find({});
    res.status(200).json({ message: topProducts, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = {
  getBestSellingsProduct,
  getProduct,
  createProduct,
  getAppStats,
  updateProduct,
  deleteProduct,
  reduceQuantityOfProduct,
  searchProduct,
  getCategory,
  findProducts,
};
