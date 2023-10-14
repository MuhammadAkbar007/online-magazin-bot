const User = require("../../model/user");
const { bot } = require("../bot.js");

const start = async (msg) => {
  const chatId = msg.from.id;
  let checkUser = await User.findOne({ chatId }).lean();
  if (!checkUser) {
    let newUser = User({
      name: msg.from.first_name,
      chatId,
      createdAt: new Date(),
      action: "request contact",
    });
    await newUser.save();
    bot.sendMessage(
      chatId,
      `Assalomu alaykum, hurmatli ${msg.from.first_name}. Iltimos telefon raqamingizni share qiling!`,
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: "Telefon raqamni yuborish",
                request_contact: true,
              },
            ],
          ],
          resize_keyboard: true,
        },
      },
    );
  }
};

module.exports = { start };
