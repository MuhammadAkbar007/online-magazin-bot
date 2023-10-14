const express = require("express");
const mongoose = require("mongoose");
const User = require("./model/user"); /* after findOne is not a function error */

require("./bot/bot.js");
require("dotenv").config();
const app = express();

app.use(express.json());

async function dev() {
  try {
    await mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB connect"))
      .catch((err) => console.log(err));

    app.listen(process.env.PORT, () => console.log("Server is running!"));
  } catch (error) {
    console.log(error);
  }
}

dev();
