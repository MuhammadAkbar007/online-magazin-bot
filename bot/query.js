const User = require("../model/user");
const { bot } = require("./bot.js");
const { add_category } = require("./helper/category");

bot.on("callback_query", async (query) => {
  const chatId = query.from.id;
  const { data } = query;

  if (data === "add_category") add_category(chatId);
});
