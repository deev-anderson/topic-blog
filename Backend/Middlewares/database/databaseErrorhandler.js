const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../../Helpers/error/CustomError");
const Story = require("../../Models/story");

const checkStoryExist = asyncErrorWrapper(async (req, res, next) => {
  const { _id } = req.params;
  const story = await Story.findOne({
    _id,
  });

  if (!story) {
    return next(new CustomError("Erro ao atualizar a postagem", 400));
  }

  next();
});

const checkUserAndStoryExist = asyncErrorWrapper(async (req, res, next) => {
  const { _id } = req.params;

  const story = await Story.findOne({
    _id,
    author: req.user,
  });

  if (!story) {
    return next(
      new CustomError(
        "There is no story with that slug associated with User ",
        400
      )
    );
  }

  next();
});

module.exports = {
  checkStoryExist,
  checkUserAndStoryExist,
};
