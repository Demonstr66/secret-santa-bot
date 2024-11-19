const { Markup } = require('telegraf');

const t = {
  cmdManageRoom: 'room',
  cmdShowUsers: { text: 'Показать участников', callback_data: 'showParticipants' },
  cmdRss: { text: 'Рассылка', callback_data: 'sendBroadcast' },
  cmdRunChallenge: { text: 'Провести розыгрыш', callback_data: 'startDraw' },
  msgNotInRoom: 'Для начала присоеденитесь к комнате, или создайте свою! /start',
  msgActionsHeader: 'Выберите действие:'
}


module.exports = (bot) => {
  bot.command(t.cmdManageRoom,  (ctx) => {
    if (!ctx.room) return ctx.reply(t.msgNotInRoom);

    const inline_keyboard = [
      [t.cmdShowUsers],
    ]

    if (ctx.user.isRoomAdmin) {
      inline_keyboard.push(
        [t.cmdRss],
        [t.cmdRunChallenge]
      )
    }

    return ctx.reply(t.msgActionsHeader, {
      reply_markup: {inline_keyboard}
    });
  });
};
