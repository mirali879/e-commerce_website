const cartModel = require("../models/cartModel");

const createCart = async (req, res, next) => {
  try {
    const newCart = await cartModel.create(req.body);
    return res.status(200).json({ message: newCart, success: true });
  } catch (error) {
    next(error);
  }
};
const getCart = async (req, res, next) => {
  try {
    const allCart = await cartModel.find({ ...req.query });
    return res.status(200).json({ message: allCart, success: true });
  } catch (error) {
    next(error);
  }
};

const updateCart = async (req, res, next) => {
  const cartId = req.params.id;
  try {
    const updatedCart = await cartModel.findByIdAndUpdate(
      {
        _id: cartId,
      },
      {
        $set: req.body,
      },
      {
        returnDocument: true,
        new: true,
      }
    );
    return res.status(200).json({ message: updatedCart, success: true });
  } catch (error) {
    next(error);
  }
};
const deleteCart = async (req, res, next) => {
  const cartId = req.params.id;

  try {
    await cartModel.deleteOne({ _id: cartId });
    return res
      .status(200)
      .json({ message: "deleted successfully", success: true });
  } catch (error) {
    next(error);
  }
};
module.exports = { createCart, getCart, updateCart, deleteCart };
