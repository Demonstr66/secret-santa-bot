const { addUser, getUserById, getRoomById, getUsersByRoomId} = require('../services/firebaseService'); // Импортируем методы для работы с Firebase
const User = require('../models/userModel'); // Импортируем модель пользователя

// Middleware для проверки пользователя
const roomMiddleware = async (ctx, next) => {
  const user = ctx.user
  if (user && user.roomId) {
    try {
      const room = await getRoomById(user.roomId)
      ctx.room = room
      if (room.adminId === user.userId) ctx.user.isRoomAdmin = true;
      ctx.room.users = await getUsersByRoomId(user.roomId);
    }catch(err) {
      console.log(err)
    }

  }

  return next();
};

module.exports = roomMiddleware;
