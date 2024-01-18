const userModel = require("../models/userModel");

const registerUser = async (req, res, next) => {
  try {
    const newUser = await userModel.create(req.body);
    return res.status(200).json({ message: newUser, success: true });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password: userPassword } = req.body;
  try {
    if (!email || !userPassword) {
      throw Error("fill all the creadentials");
    }
    const loggedInUser = await userModel.findOne({ email });
    console.log(loggedInUser);
    if (!loggedInUser) {
      throw Error("email is not registered");
    }
    if (userPassword !== loggedInUser.password) {
      throw Error("invalid creadentials");
    }
    const { password, ...other } = loggedInUser._doc;
    req.session.user = other;
    res.status(200).json({ message: other });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const logoutUser = (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (!err) {
        res.clearCookie("producthub.sid");
        res
          .status(200)
          .json({ message: "logged out successfully", success: true });
      } else {
        res.status(404).json({ message: "failed to log out", success: false });
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, logoutUser };
