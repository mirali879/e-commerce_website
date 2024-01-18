const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "https://i.stack.imgur.com/l60Hf.png",
    },

    country: {
      type: String,
      required: true,
    },
    isAdmin: {
      default: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
