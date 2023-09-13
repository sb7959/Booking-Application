const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");
require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
require("express-async-errors");

const authRoute = require("./routes/auth");
const usersRoute = require("./routes/user");
const hotelsRoute = require("./routes/hotel");
const roomsRoute = require("./routes/room");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use(errorHandlerMiddleware);
app.use(notFound);

app.listen(4000, () => {
  connect();
  console.log("listening on port 4000");
});
