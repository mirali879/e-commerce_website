//This code is a module in Node.js that exports a function to connect to a MongoDB database using Mongoose, a popular MongoDB ODM (Object Data Modeling) library.

const mongoose = require("mongoose");//This line imports the Mongoose library, allowing you to interact with MongoDB using a higher-level, schema-based approach

module.exports = async () => {

  //The try block attempts to connect to the MongoDB database using the mongoose.connect method. The database URI is provided as an environment variable (process.env.MONGO_URI).
  //If the connection is successful, a message is logged to the console indicating that the connection was established.
  //If an error occurs during the connection attempt, the catch block logs an error message to the console.
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to  Mongoose");
  } catch (error) {
    console.log("error connecting to Mongoose");
  }
};
