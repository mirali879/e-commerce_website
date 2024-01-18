const {
  createCart,
  getCart,
  updateCart,
  deleteCart,
} = require("../controller/cartController");

const router = require("express").Router();

router.post("/create", createCart);
router.get("/", getCart);
router.put("/:id", updateCart);
router.delete("/:id", deleteCart);
module.exports = router;
