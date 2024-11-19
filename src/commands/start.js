const { Markup, Extra } = require('telegraf');
const {createRoom, addUserToRoom, updateUser} = require("../services/firebaseService");
const {USER_STAGE} = require("../utils/constants");

const t = {
  welcomeMessage: "Хо-хо-хо! Я твой 🎅 *Санта-Бот*! Пора наводить волшебство! Выбирай, что будем делать:",
  cmdCreateRoom: "🎄 Создать праздничную комнату",
  cmdJoinToRoom: "🔔 Присоединиться к уже готовой комнате",
  enterRoomName: "🎁 Введи название твоей комнаты. Пусть это будет что-то волшебное!",
  enterRoomId: 'Ты решил присоединиться к веселью! Введи ID комнаты и добро пожаловать в новогоднее чудо:',
  msgAlreadyInRoom: (name) => `🎅 Ты уже в комнате *${name}*! Держу кулаки, что подарок будет сказочным!`,
  msgJoinedToRoom: (name) => `🎉 Ого! Ты теперь в комнате *${name}*! Пора готовить подарки!`,
  msgRoomCreated: (name) => `🎄 Комната *"${name}"* создана! Ты главный 🎅 этой комнаты! Поделись этой ссылкой с другом, чтобы он присоединился к веселью!`,
  msgInvite: (name, url) => `🎅 Хо-хо-хо! Тебя приглашают в команду "${name}" для участия в игре Тайный Санта! Для участия перейди по ссылке и нажми "Старт"!: ${url}`,
}


module.exports = (bot) => {
  bot.start(async (ctx) => {
    const user = ctx.user;
    const room = ctx.room;

    if (user.roomId) {
      ctx.replyWithMarkdown(t.msgAlreadyInRoom(room.name))
      return
    }

    const roomId = ctx.message.text.split(' ')[1]; // Извлекаем ID комнаты из команды /start

    if (roomId) {
      // Если есть ID комнаты, добавляем пользователя в комнату
      const result = await addUserToRoom(user.userId, roomId);

      if (result.success) {
        await updateUser(user.userId, {status: USER_STAGE.JOINED_TO_ROOM});
        ctx.replyWithMarkdown(t.msgJoinedToRoom(result.room.name))
      } else {
        ctx.replyWithMarkdown(`Ошибка: ${result.message}`);
      }
    } else {
      const keyboard = Markup.keyboard([
        [t.cmdCreateRoom],
        // [joinCommand]
      ])
        .resize()
        .oneTime()

      ctx.replyWithMarkdown(t.welcomeMessage, keyboard);
    }
  });

  bot.hears(t.cmdCreateRoom, async (ctx) => {
    const user = ctx.user;
    const userId = ctx.user.userId;

    if (!ctx.session) ctx.session = {}
    ctx.session.waitingText = true;
    ctx.session.textHandler = async (ctx) => {
      const roomName = ctx.message.text;

      // Создаем комнату и привязываем пользователя
      const room = await createRoom(userId, roomName);

      if (room) {
        await updateUser(user.userId, { status: USER_STAGE.JOINED_TO_ROOM });
        await ctx.replyWithMarkdown(t.msgRoomCreated(room.name));

        // Генерируем уникальную ссылку-приглашение
        await ctx.reply(
          t.msgInvite(room.name, `https://t.me/${ctx.botInfo.username}?start=${room.id}`)
        );
      } else {
        await ctx.replyWithMarkdown('Произошла ошибка при создании комнаты. Попробуйте позже.');
      }
    };

    // Просим пользователя ввести название комнаты и удаляем клавиатуру
    await ctx.replyWithMarkdown(t.enterRoomName, Markup.removeKeyboard());
  });

  bot.hears(t.cmdJoinToRoom,  (ctx) => {
    ctx.replyWithMarkdown(t.enterRoomId, Markup.removeKeyboard());
  });
};
