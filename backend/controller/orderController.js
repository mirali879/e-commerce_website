const orderModel = require("../models/orderModel");

const createOrder = async (req, res, next) => {
  try {
    await orderModel.create(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
const getOrder = async (req, res, next) => {
  try {
    let allOrder = await orderModel
      .find({ ...req.query })
      .populate(["buyer", "item.product"])
      .sort({ createdAt: -1 });

    return res.status(200).json({ message: allOrder, success: true });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  const orderId = req.params.id;
  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(
      {
        _id: orderId,
      },
      {
        $set: req.body,
      },
      {
        returnDocument: true,
        new: true,
      }
    );
    return res.status(200).json({ message: updatedOrder, success: true });
  } catch (error) {
    next(error);
  }
};
const deleteOrder = async (req, res, next) => {
  const orderId = req.params.id;

  try {
    await orderModel.deleteOne({ _id: orderId });
    return res
      .status(200)
      .json({ message: "deleted successfully", success: true });
  } catch (error) {
    next(error);
  }
};

const checkIfOrderIsDone = async (req, res, next) => {
  const { order_intent_secret } = req.params;
  try {
    const order = await orderModel.findOne({
      order_intent_secret,
    });
    res.status(200).json({ message: order ? true : false, success: true });
  } catch (error) {
    res.status(500).json({ message: "something went wrong", success: true });
  }
};

module.exports = {
  createOrder,
  getOrder,
  updateOrder,
  checkIfOrderIsDone,
  deleteOrder,
};
