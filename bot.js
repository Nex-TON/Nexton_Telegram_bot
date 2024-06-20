const TelegramBot = require("node-telegram-bot-api");
const api = require("./api");

// Initialize the bot
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

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

bot.onText(/\/start (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const param = match[1];

  logUserInteraction(chatId, "started", param);
});

bot.onText(/\/start$/, (msg) => {
  const chatId = msg.chat.id;

  logUserInteraction(chatId, "started", "no_param");
  sendWelcomeMessage(chatId);
});

bot.onText(/\/stake (\d+) (\d+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const var1 = match[1];
  const var2 = match[2];

  bot.sendMessage(chatId, `You staked ${var1} and ${var2}.`);
});

function sendWelcomeMessage(chatId) {
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
}

module.exports = { bot };
