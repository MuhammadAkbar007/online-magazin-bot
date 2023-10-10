const express = require("express");
const mongoose = require("mongoose");
const TELEGRAM_BOT = require("node-telegram-bot-api");
const User = require("./model/user"); /* after findOne is not a function error */

const app = express();

const PORT = 3000;
const MONGO_URI = "mongodb://127.0.0.1:27017/technomagaz";
const TOKEN = "5691142792:AAGIyyYQkC9JRxOqcTc57qb6AA9OcMqWZ7w";

const bot = new TELEGRAM_BOT(TOKEN, { polling: true });
app.use(express.json());

bot.on("message", async (msg) => {
  const chatId = msg.from.id;
  const text = msg.text;
  if (text === "/start") {
    let checkUser = await User.findOne({ chatId }).lean();
    if (!checkUser) {
      const newUser = new User({
        name: msg.from.first_name,
        chatId,
        createdAt: new Date(),
        action: "start",
      });
      await newUser.save();
    }
  } else {
    bot.sendMessage(chatId, text.toUpperCase());
  }
});

async function dev() {
  try {
    await mongoose
      .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("MongoDB connect"))
      .catch((err) => console.log(err));

    app.listen(PORT, () => console.log("Server is running!"));
  } catch (error) {
    console.log(error);
  }
}

dev();
