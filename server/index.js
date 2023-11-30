const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const userRouter = require("./routes").userRouter;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/user", userRouter);

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
