const TelegramBot = require('node-telegram-bot-api');
const api = require('./api');

const ONBOARDING_URL = 'https://nex-ton.github.io/Nexton_Onboarding_Frontend/';
const NEXTON_URL = 'https://www.nexton.tg';
const GLOBAL_CHANNEL_URL = 'https://t.me/nextonglobal';
const LANDING_PAGE_URL = 'https://www.nexton.solutions/';
const ARBITRAGE_BOT_PERFORMANCE_URL = 'https://t.me/+_qrUElvbPRtlZDI1';
const COMMUNITY_URL='https://t.me/NextonOfficialCommunity'

const IMG_URL =
  'https://nextonserver.s3.eu-north-1.amazonaws.com/nexton_stake.jpg';

// Initialize the bot
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

async function logUserInteraction(userId, action, parameter) {
  try {
    await api.post('data/analytics/log', {
      userId,
      action,
      parameter,
    });
  } catch (error) {
    console.error('Error logging user interaction:', error);
  }
}

bot.onText(/\/start (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const param = match[1];

  logUserInteraction(chatId, 'started', param);
});

bot.onText(/\/start$/, msg => {
  const chatId = msg.chat.id;

  logUserInteraction(chatId, 'started', 'no_param');
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
    'Stake $TON, receive a Nexton NFT, and benefit from staking and arbitrage yields!';
  const button1 = {
    text: '🚀 Open Nexton',
    web_app: { url: NEXTON_URL },
  };
  const button2 = {
    text: '👥 Join our Global Channel',
    url: GLOBAL_CHANNEL_URL,
  };
  const button3 = {
    text: '🔥 Join Our Official Community',
    url: COMMUNITY_URL,
  };
  const button4 = {
    text: '👋 Official Website',
    url: LANDING_PAGE_URL,
  };
  const button5 = {
    text: '📊 Go to Arbitrage Bot Performance',
    url: ARBITRAGE_BOT_PERFORMANCE_URL,
  };

  const inlineButtons = [[button1], [button2], [button3], [button4], [button5]];
  const buttonOptions = {
    reply_markup: {
      inline_keyboard: inlineButtons,
    },
  };

  bot
    .sendPhoto(chatId, IMG_URL, {
      parse_mode: 'HTML',
      caption: message,
      ...buttonOptions,
    })
    .catch(error => {
      console.error('Error sending photo:', error);
    });
}

module.exports = { bot };
