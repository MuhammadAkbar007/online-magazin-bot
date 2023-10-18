const User = require("../model/user");
const { bot } = require("./bot.js");
const { start, requestContact } = require("./helper/start.js");
const { get_all_users } = require("./helper/users");

bot.on("message", async (msg) => {
  const chatId = msg.from.id;
  const text = msg.text;

  const user = await User.findOne({ chatId }).lean();

  if (text === "/start") {
    start(msg);
  }

  if (user) {
    if (user.action === "request_contact" && !user.phone) {
      requestContact(msg);
    }

    if (text === "Foydalanuvchilar") {
      get_all_users(msg);
    }
  }
});
