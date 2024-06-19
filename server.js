require("dotenv").config();
const express = require("express");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");
const api = require("./api");

const app = express();
app.use(cors());
app.use(express.json());

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

let chatId = 500;

// Function to log user interaction
async function logUserInteraction(userId, action, parameter) {
  try {
    await api.post("data/analytics/log", {
      userId,
      action,
      parameter,
    });
  } catch (error) {
    console.error("Error logging user interaction:", error);
  }
}

// Handle /start command with parameters
bot.onText(/\/start (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const param = match[1]; // Extract the parameter after /start

  // Log the parameter
  logUserInteraction(chatId, "started", param);
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Replace 'path/to/your/image.jpg' with the actual path to your image file
  const message =
    "Stake $TON, receive a Nexton NFT, and benefit from staking and arbitrage yields!";
  const button1 = {
    text: "Onboarding",
    web_app: { url: "https://nex-ton.github.io/Nexton_Onboarding_Frontend/" },
  };
  const button2 = {
    text: "Open Nexton",
    web_app: { url: "https://www.nexton.tg" },
  };

  // Create an array of inline button rows (each row is an array of button options)
  const inlineButtons = [[button1, button2]];

  const buttonOptions = {
    reply_markup: {
      inline_keyboard: inlineButtons,
    },
  };

  bot
    .sendPhoto(
      chatId,
      "https://nextonserver.s3.eu-north-1.amazonaws.com/nexton_stake.jpg",
      {
        parse_mode: "HTML",
        caption: message,
        ...buttonOptions,
      }
    )
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
