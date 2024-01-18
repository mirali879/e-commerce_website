const {
  getUser,
  updateUser,
  getSessionUser,
} = require("../controller/userController");

const router = require("express").Router();

router.get("/", getUser);
router.put("/:id", updateUser);
router.get("/sessionUser", getSessionUser);
module.exports = router;
