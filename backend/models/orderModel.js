const mongoose = require("mongoose");
const orderProductSchema = mongoose.Schema({
  buyQuantity: Number,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
});

const orderSchema = mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    // product: [orderProductSchema],
    item: [orderProductSchema],
    totalPrice: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
    },
    order_intent_secret: String,
    status: {
      type: String,
      required: true,
      enum: ["pending", "dispatched", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orderr", orderSchema);
