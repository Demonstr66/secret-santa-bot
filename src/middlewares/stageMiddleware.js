const {USER_STAGE} = require("../utils/constants");
const {handleNameInput, handleDescriptionInput, handlePhotoInput} = require("../actions/stageActions");

const stageMiddleware = async (ctx, next) => {
  if (!ctx.user || !ctx.user.stage) {
    return next();
  }

  switch (ctx.user.stage) {
    case USER_STAGE.WAITING_FOR_NAME:
      return await handleNameInput(ctx);
    case USER_STAGE.WAITING_FOR_DESCRIPTION:
      return await handleDescriptionInput(ctx);
    case USER_STAGE.WAITING_FOR_PHOTO:
      return await handlePhotoInput(ctx);
    default:
      return next();
  }
};

module.exports = stageMiddleware;
