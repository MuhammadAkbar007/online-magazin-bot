const User = require("../model/user");
const { bot } = require("./bot.js");
const {
  add_category,
  pagination_category,
  show_category,
  remove_category,
} = require("./helper/category");

bot.on("callback_query", async (query) => {
  const chatId = query.from.id;
  const { data } = query;

  console.log(data);

  if (data === "add_category") add_category(chatId);

  if (["back_category", "next_category"].includes(data))
    pagination_category(chatId, data);

  if (data.includes("category_")) {
    let id = data.split("_")[1];
    show_category(chatId, id);
  }

  if (data.includes("del_category-")) {
    let id = data.split("-")[1];
    remove_category(chatId, id);
  }
});
