const admin = require('firebase-admin');
const {FB_DB_URL, FB_CONFIG} = require("../config");
const User = require('../models/userModel');
const Room = require("../models/roomModel"); // Импортируем модель пользователя

// Инициализация Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(FB_CONFIG),
  databaseURL: FB_DB_URL
});

const db = admin.database();

// Метод для добавления нового пользователя
const addUser = async (userId, username) => {
  const user = new User(userId, username); // Создаем нового пользователя на основе модели

  try {
    await db.ref(`users/${userId}`).set(user); // Сохраняем пользователя в базе данных
    console.log(`Пользователь ${username} добавлен в базу данных.`);
  } catch (error) {
    console.error('Ошибка при добавлении пользователя в базу данных:', error);
  }
};

// Метод для проверки существования пользователя
const getUserById = async (userId) => {
  try {
    const snapshot = await db.ref(`users/${userId}`).once('value');
    if (snapshot.exists()) {
      return snapshot.val(); // Возвращаем данные пользователя, если он существует
    } else {
      return null; // Если пользователя нет
    }
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error);
    throw error; // Пробрасываем ошибку выше
  }
};

// Метод для обновления данных пользователя
const updateUser = async (userId, updateData) => {
  try {
    // Обновляем данные пользователя по userId
    await db.ref(`users/${userId}`).update(updateData);
    console.log(`Пользователь ${userId} успешно обновлен.`);
    return { success: true };
  } catch (error) {
    console.error('Ошибка при обновлении пользователя:', error);
    return { success: false, message: 'Ошибка при обновлении данных пользователя' };
  }
};

// Метод для создания новой комнаты
const createRoom = async (adminId, roomName) => {
  const room = new Room(adminId, roomName); // Создаем новую комнату

  try {
    await db.ref(`rooms/${room.id}`).set(room); // Сохраняем комнату в базе данных
    console.log(`Комната ${roomName} создана.`);

    // Обновляем пользователя, чтобы привязать его к комнате
    await db.ref(`users/${adminId}`).update({ roomId: room.id });
    console.log(`Пользователь ${adminId} привязан к комнате ${room.id}.`);
    return room;
  } catch (error) {
    console.error('Ошибка при создании комнаты:', error);
  }
};

// Метод для получения комнаты
const getRoomById = async (roomId) => {
  try {
    const snapshot = await db.ref(`rooms/${roomId}`).once('value');
    if (snapshot.exists()) {
      return snapshot.val(); // Возвращаем данные пользователя, если он существует
    } else {
      return null; // Если пользователя нет
    }
  } catch (error) {
    console.error('Ошибка при получении данных комнаты:', error);
    throw error; // Пробрасываем ошибку выше
  }
};

// Метод для добавления пользователя в существующую комнату
const addUserToRoom = async (userId, roomId) => {
  try {
    // Проверяем, существует ли комната
    const roomSnapshot = await db.ref(`rooms/${roomId}`).once('value');

    if (!roomSnapshot.exists()) {
      return { success: false, message: 'Комната не найдена' };
    }

    // Привязываем пользователя к комнате
    await db.ref(`users/${userId}`).update({ roomId });

    // Возвращаем данные о комнате
    const room = roomSnapshot.val();
    console.log(`Пользователь ${userId} присоединился к комнате ${roomId}.`);
    return { success: true, room };
  } catch (error) {
    console.error('Ошибка при добавлении пользователя в комнату:', error);
    return { success: false, message: 'Ошибка при добавлении в комнату' };
  }
};

const getUsersByRoomId = async (roomId) => {
  try {
    // Получаем всех пользователей
    const snapshot = await db.ref('users').once('value');

    if (!snapshot.exists()) {
      return [];
    }

    const users = snapshot.val();

    // Фильтруем пользователей по roomId
    return Object.values(users).filter(user => user.roomId === roomId);
  } catch (error) {
    console.error('Ошибка при получении пользователей по roomId:', error);
    return [];
  }
}

module.exports = {
  addUser,
  getUserById,
  createRoom,
  getRoomById,
  addUserToRoom,
  updateUser,
  getUsersByRoomId
};