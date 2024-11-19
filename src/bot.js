const { Telegraf, session} = require('telegraf');
const config = require('./config');
const startCommand = require('./commands/start');
const roomCommand = require('./commands/room');
const roomActions = require('./actions/roomActions');
const userMiddleware = require("./middlewares/userMiddleware");
const roomMiddleware = require("./middlewares/roomMiddleware");
const stageMiddleware = require("./middlewares/stageMiddleware");

const bot = new Telegraf(config.BOT_TOKEN);

bot.use(session());
bot.use(userMiddleware);
bot.use(roomMiddleware);
bot.use(stageMiddleware);

startCommand(bot);
roomCommand(bot)
roomActions(bot)

bot.on('text', async (ctx) => {
  if (!ctx.session) {
    ctx.session = {};
  }
  // Проверяем, не является ли текст командой (начинается с '/')
  if (!ctx.message.text.startsWith('/')) {
    // Проверяем, ожидается ли ввод текста
    if (ctx.session.waitingText && typeof ctx.session.textHandler === 'function') {
      // Вызываем обработчик текста
      await ctx.session.textHandler(ctx);

      // Сбрасываем флаг ожидания текста и обработчик
      ctx.session.waitingText = false;
      ctx.session.textHandler = null;
    } else {
      // Если бот не ожидал текст, выводим сообщение об ошибке
      await ctx.replyWithMarkdown('Пожалуйста, используйте команды или следуйте инструкциям.');
    }
  }
});

module.exports = bot