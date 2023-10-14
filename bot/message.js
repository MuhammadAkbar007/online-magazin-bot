const { bot } = require("./bot.js");
const { start } = require("./helper/start.js");

bot.on("message", (msg) => {
  const chatId = msg.from.id;
  const text = msg.text;
  if (text === "/start") {
    start(msg);
  }
});
