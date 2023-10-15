const User = require("../../model/user");
const { bot } = require("../bot.js");

const start = async (msg) => {
  const chatId = msg.from.id;

  let checkUser = await User.findOne({ chatId }).lean();

  if (!checkUser) {
    let newUser = new User({
      name: msg.from.first_name,
      chatId,
      createdAt: new Date(),
      action: "request_contact",
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

const requestContact = async (msg) => {
  const chatId = msg.from.id;

  if (msg.contact.phone_number) {
    let user = await User.findOne({ chatId }).lean();
    user.phone = msg.contact.phone_number;
    user.admin = msg.contact.phone_number == "+998945060749";
    user.action = "menu";

    await User.findOneAndUpdate(user._id, user, { new: true });

    bot.sendMessage(
      chatId,
      `Menyuni tanlang, ${user.admin ? "Admin" : user.name} `,
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: "Katalog",
              },
            ],
          ],
          resize_keyboard: true,
        },
      },
    );
  }
};

module.exports = { start, requestContact };
