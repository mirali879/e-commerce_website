//This code sets up a basic Express.js server for a web application, likely with a MongoDB database, user authentication, and various routes for handling different aspects of the application


const express = require("express");//Importing the Express.js framework for building the server.

const app = express();
//Creating an instance of the Express application.

const morgan = require("morgan");//Importing the morgan middleware for logging HTTP requests.

app.use(express.json());//Using express.json() to parse incoming JSON requests.

require("dotenv").config();//Loading environment variables from a .env file using dotenv.

const cors = require("cors");//Importing the cors middleware to handle Cross-Origin Resource Sharing.

const cookieParser = require("cookie-parser");//Importing cookieParser for parsing cookies.

const session = require("express-session");//Importing express-session for managing sessions.

//Configuring Cross-Origin Resource Sharing (CORS) to allow requests from specified origins.
//Enabling credentials for cross-origin requests.
app.use(
  cors({
    origin: [ "http://localhost:5500","http://127.0.0.1:5500","https://miralimammad.netlify.app"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
   })
);
  

  // app.set("trust proxy", 1); // trust first proxy
  app.use(cookieParser());
  app.use(morgan("dev"));
  
  require("./utils/db")();//Calling a function from the ./utils/db module to establish a connection to the MongoDB database.


  //Session Configuration:
//Configuring Express session middleware with certain options:




app.use(
  session({
    name: "producthub.sid",//name: The name of the session cookie.
    secret: "productHub",//secret: Secret used to sign the session ID cookie.
    saveUninitialized: true,//saveUninitialized: Save uninitialized sessions.
    
    resave: false,//resave: Do not save session if unmodified.
    //cookie: Configuration for the session cookie.
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "none",
    },
  })
);
console.log("incoming ..")
//Setting up various routes for different aspects of the application using separate route modules.
//The routes are prefixed with /api/user, /api/product, etc.
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/product", require("./routes/productRoute"));
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/category", require("./routes/categoryRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/cart", require("./routes/cartRoute"));
app.use("/api/payment",require("./routes/payment"))




app.use(require("./middlewares/error"));//Using a custom error-handling middleware from the ./middlewares/error module.
app.listen(8000, () => console.log("server listening on port 8000"));//Starting the server and listening on port 8000.


//In summary, this code configures an Express.js server with middleware for handling JSON, CORS, cookies, and sessions. It establishes a connection to a MongoDB database, sets up various routes for the application, and includes error-handling middleware. The server is configured to listen on port 8000.
