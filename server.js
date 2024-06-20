require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { bot } = require("./bot");
const { errorHandler } = require("./middlewares/errorHandler");
const { rateLimiter } = require("./middlewares/rateLimiter");

const app = express();
app.use(cors());
app.use(express.json());
app.use(rateLimiter); // Apply rate limiting middleware

app.use("/api", routes); // Use the routes module for API routes

// Error handling middleware
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
