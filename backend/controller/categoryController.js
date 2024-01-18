const categoryModel = require("../models/categoryModel");

const createCategory = async (req, res, next) => {
  try {
    const newCategory = await categoryModel.create(req.body);
    return res.status(200).json({ message: newCategory, success: true });
  } catch (error) {
    next(error);
  }
};
const getCategory = async (req, res, next) => {
  try {
    const allCategory = await categoryModel.find({});
    return res.status(200).json({ message: allCategory, success: true });
  } catch (error) {
    next(error);
  }
};
const deleteCategory = async (req, res, next) => {
  const controllerId = req.params.id;
  try {
    await categoryModel.deleteOne({ _id: controllerId });
    return res
      .status(200)
      .json({ message: "succcessfully deleted", success: true });
  } catch (error) {
    next(error);
  }
};
module.exports = { createCategory, getCategory, deleteCategory };
