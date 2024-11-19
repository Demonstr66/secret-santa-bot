require('dotenv').config(); // Загрузка переменных окружения из файла .env
const {BOT_TOKEN, FB_DB_URL, FB_CONFIG} = require("./secure");

module.exports = {
  BOT_TOKEN: BOT_TOKEN,
  FB_DB_URL: FB_DB_URL,
  FB_CONFIG: FB_CONFIG,
  PORT: process.env.PORT || 3000, // Порт для запуска приложения (если потребуется)
};