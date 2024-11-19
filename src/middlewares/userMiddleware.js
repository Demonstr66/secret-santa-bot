const { addUser, getUserById } = require('../services/firebaseService'); // Импортируем методы для работы с Firebase
const User = require('../models/userModel'); // Импортируем модель пользователя

// Middleware для проверки пользователя
const userMiddleware = async (ctx, next) => {
  const userId = ctx.from.id; // Получаем ID пользователя
  const username = ctx.from.username || 'Неизвестный пользователь'; // Получаем имя пользователя или задаем по умолчанию

  try {
    // Пытаемся получить данные пользователя из Firebase
    const user = await getUserById(userId);

    if (user) {
      // Если пользователь существует, сохраняем его данные в ctx
      ctx.user = user;
      console.log(`Пользователь ${username} найден в базе данных.`);
    } else {
      // Если пользователь не существует, создаем нового
      await addUser(userId, username);
      ctx.user = new User(userId, username); // Создаем объект пользователя на основе модели
      console.log(`Пользователь ${username} добавлен в базу данных.`);
    }
  } catch (error) {
    console.error('Ошибка при проверке пользователя:', error);
    return ctx.reply('Произошла ошибка. Пожалуйста, попробуйте позже.'); // Обработка ошибок
  }

  // Передаем управление следующему middleware или обработчику
  return next();
};

module.exports = userMiddleware;
