const {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  checkIfOrderIsDone,
} = require("../controller/orderController");
const { reduceQuantityOfProduct } = require("../controller/productController");

const router = require("express").Router();

router.post("/create", createOrder, reduceQuantityOfProduct);
router.get("/", getOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.get("/checkIsOrderIsDone/:order_intent_secret", checkIfOrderIsDone);
module.exports = router;
