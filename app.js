const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const errorMiddleware = require("./middleware/error");


require("dotenv").config({ path: "./config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Route Imports
const user = require("./routes/userRoute");
const product = require('./routes/productRoute')

app.use("/api/v1", user);
app.use("/api/v1", product);
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "server is working properly"
  })
})

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;