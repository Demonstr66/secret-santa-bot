// Модель пользователя
const {USER_STAGE} = require("../utils/constants");

class User {
  constructor(userId, username) {
    this.userId = userId;                // ID пользователя
    this.username = username;            // Имя пользователя
    this.createdAt = new Date().toISOString(); // Дата создания
    this.roomId = null;                  // ID комнаты (по умолчанию null)
    this.status = USER_STAGE.ENTERED;               // Статус пользователя (по умолчанию 'active')
    this.photo = null;                   // Фото пользователя (по умолчанию null)
    this.description = '';               // Описание (по умолчанию пустая строка)
    this.wishList = [];                  // Список желаемого (по умолчанию пустой массив)
  }
}

module.exports = User;
