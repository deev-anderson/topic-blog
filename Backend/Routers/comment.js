const express = require("express");

const { getAccessToRoute } = require("../Middlewares/Authorization/auth");

const {
  addNewCommentToStory,
  getAllCommentByStory,
  commentLike,
  getCommentLikeStatus,
} = require("../Controllers/comment");

const {
  checkStoryExist,
} = require("../Middlewares/database/databaseErrorhandler");

const router = express.Router();

router.post(
  "/:_id/add-comment",
  [getAccessToRoute, checkStoryExist],
  addNewCommentToStory
);

router.get("/:_id/get-all-comment", getAllCommentByStory);

router.post("/:comment_id/like", commentLike);

router.post("/:comment_id/get-comment-like-status", getCommentLikeStatus);

module.exports = router;
