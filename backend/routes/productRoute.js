const {
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  searchProduct,
  getAppStats,
  getCategory,
  findProducts,
  getBestSellingsProduct
} = require("../controller/productController");

const router = require("express").Router();



router.get("/", getProduct);
router.get("/stats",getAppStats)
router.get("/find",findProducts)
router.put("/:id", updateProduct);
router.get("/category",getCategory)
router.get("/search",searchProduct)
router.delete("/:id", deleteProduct);
router.post("/create", createProduct);
router.get("/topSelling",getBestSellingsProduct)


module.exports = router;
