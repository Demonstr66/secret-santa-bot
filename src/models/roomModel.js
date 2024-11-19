class Room {
  constructor(adminId, name) {
    this.id = `room_${new Date().getTime()}`;  // Уникальный ID для комнаты
    this.adminId = adminId;                    // ID администратора комнаты
    this.name = name;                          // Название комнаты
    this.status = 'active';                    // Статус комнаты (по умолчанию активен)
  }
}

module.exports = Room;
