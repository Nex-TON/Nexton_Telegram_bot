const axios = require('axios');

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: process.env.SERVER_URL,
});

module.exports = api;
