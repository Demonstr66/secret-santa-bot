const {updateUser} = require("../services/firebaseService");
const {USER_STAGE} = require("../utils/constants");
const handleNameInput = async (ctx) => {
  const name = ctx.message.text;
  await updateUser(ctx.user.userId, { username: name, stage: USER_STAGE.WAITING_FOR_DESCRIPTION });
  return ctx.reply('Введите описание о себе');
}

const handleDescriptionInput = async (ctx) => {
  const description = ctx.message.text;
  await updateUser(ctx.user.userId, { description: description, stage: USER_STAGE.WAITING_FOR_DESCRIPTION });
  return ctx.replyWithMarkdown('Спасибо за информацию! Вы можете заполнить список желаний и ожидайте розыгрыша.');

}

const handlePhotoInput = (ctx) => {}


module.exports = {
  handleNameInput,
  handleDescriptionInput,
  handlePhotoInput,
}