const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// replace the value below with the Telegram token you receive from @BotFather

const token = process.env.TELEGRAM_BOT_TOKEN;
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

let chatId = 500;

bot.on("message", (msg) => {
  chatId = msg.chat.id;
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Replace 'path/to/your/image.jpg' with the actual path to your image file
  const message = "Let's start!\nPlease connect wallet first";
  const button1 = {
    text: "Open Nexton",
    web_app: { url: "https://hack-a-ton-frontend-iota.vercel.app" },
  };
  const button2 = {
    text: "🌈 Onboarding",
    web_app: { url: "https://nex-ton.github.io/Nexton_Onboarding_Frontend/" },
  };

  // Create an array of inline button rows (each row is an array of button options)
  const inlineButtons = [[button1, button2]];

  const buttonOptions = {
    reply_markup: {
      inline_keyboard: inlineButtons,
    },
  };

  bot
    .sendMessage(chatId, message, {
      parse_mode: "HTML",
      ...buttonOptions,
    })
    .catch((error) => {
      console.error("Error sending photo:", error);
    });
});

bot.onText(/\/stake (\d+) (\d+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const var1 = match[1]; // the first variable
  const var2 = match[2]; // the second variable

  bot.sendMessage(chatId, `You staked ${var1} and ${var2}.`);
});

app.get("/chatId", (req, res) => {
  res.send({ chatId });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
