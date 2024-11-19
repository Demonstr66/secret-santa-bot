const {getRoomById, getUsersByRoomId} = require("../services/firebaseService");
module.exports = (bot) => {
  bot.action('showParticipants', async (ctx) => {
    const msg = ['Участники комнаты:']
    ctx.room.users.forEach(user => {
      const userInfo = [user.username]
      if (ctx.user.isRoomAdmin) {
        userInfo.push(user.userId, user.status)
      }
      msg.push(userInfo.join('\n'))
    })

    await ctx.reply(msg.join('\n-------------\n'));
    await ctx.answerCbQuery(); // Завершение callback'а
  });

  // Обработка рассылки
  bot.action('sendBroadcast', async (ctx) => {
    await ctx.reply('Рассылка участникам комнаты запущена.');
    await ctx.answerCbQuery(); // Завершение callback'а
  });

  // Обработка проведения розыгрыша
  bot.action('startDraw', async (ctx) => {
    await ctx.reply('Розыгрыш начат!');
    // Ваш код для проведения розыгрыша
    await ctx.answerCbQuery(); // Завершение callback'а
  });
}