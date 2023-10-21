const User = require("../model/user");
const { bot } = require("./bot.js");
const { add_category, pagination_category } = require("./helper/category");

bot.on("callback_query", async (query) => {
  const chatId = query.from.id;
  const { data } = query;

  if (data === "add_category") add_category(chatId);

  if (["back_category", "next_category"].includes(data)) {
    pagination_category(chatId, data);
  }
});
