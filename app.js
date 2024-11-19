require('dotenv').config(); // Подключение переменных окружения из .env
const bot = require('./src/bot'); // Основной файл бота

const startBot = async () => {
  try {
    // Запуск бота
    await bot.launch();
    console.log('Telegram-бот успешно запущен');

    // Обработка graceful shutdown (для корректного завершения работы)
    process.once('SIGINT', () => {
      console.log('Получен сигнал SIGINT, останавливаем бота...');
      bot.stop('SIGINT');
    });
    process.once('SIGTERM', () => {
      console.log('Получен сигнал SIGTERM, останавливаем бота...');
      bot.stop('SIGTERM');
    });
  } catch (error) {
    console.error('Ошибка при запуске бота:', error);
  }
};

// Запуск бота
startBot();
