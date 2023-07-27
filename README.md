# Hack_a_TON_Telegram_bot

Telegram Bot Server README
This server code is for setting up a Telegram bot using Node.js and the node-telegram-bot-api library.

## Dependencies
The dependencies for the server are as follows:

- express: A web application framework for Node.js.
- dotenv: A zero-dependency module that loads environment variables from a .env file into process.env.
- cors: A Node.js package for providing a middleware that can be used to enable CORS.
- node-telegram-bot-api: A Node.js wrapper for the Telegram Bot API.
To install these dependencies, run the following command in your terminal:

```
npm install express dotenv cors node-telegram-bot-api
```

## Getting Started
To get started, you'll need to create a .env file in your project root directory, where you will store your Telegram bot token. The structure of the file should be like this:

```
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
```

You can replace your-telegram-bot-token with the actual token that you received from @BotFather in Telegram.

Then, to start the server, you can use the following command:

```
node server.js
```
This command starts the server on port 3000, and you should see a console log that says Server is running on port 3000.

## Server Endpoints
The server has the following endpoints:

GET /chatId: Returns the chatId of the most recent chat with the bot.
Bot Commands
The bot is set up to respond to the following commands:

/start: Sends a message "Let's start!\nPlease connect wallet first" and a button to the user. The button is labeled 'Open Nexton' and when clicked, it takes the user to a specified URL.

/stake [var1] [var2]: This command accepts two variables and sends a message back to the user stating the two values that were staked.

## Bot Events
The bot is set up to listen to the following events:

- message: This event is triggered whenever a user sends a message to the bot. The chatId of the user is stored for use in other functions.
Error Handling
If there is an error when sending a message, the bot will log the error in the console.

Please note that the /stake command does not check if the two parameters are valid numbers. You may want to add validation to ensure correct use.

## Customization
To customize this bot, you can modify the bot commands and the messages that are sent in response to the commands. You can also add more commands or event listeners as per your needs.

## Further Reading
For more information on how to use the node-telegram-bot-api library, refer to the documentation.
