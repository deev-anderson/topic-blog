const express = require("express");

const imageUpload = require("../Helpers/Libraries/imageUpload");

const {
  profile,
  editProfile,
  changePassword,
  addStoryToReadList,
  readListPage,
} = require("../Controllers/user");
const { getAccessToRoute } = require("../Middlewares/Authorization/auth");

const router = express.Router();

router.get("/profile", getAccessToRoute, profile);

router.post(
  "/editProfile",
  [getAccessToRoute, imageUpload.single("photo")],
  editProfile
);

router.put("/changePassword", getAccessToRoute, changePassword);

router.post("/:_id/addStoryToReadList", getAccessToRoute, addStoryToReadList);

router.get("/read-list", getAccessToRoute, readListPage);

module.exports = router;
