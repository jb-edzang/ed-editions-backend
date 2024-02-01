const express = require("express");
const router = express.Router();
const { logger } = require("../middlewares/logger");
const tagsController = require("../controllers/tagsController");

router
  .route("/")
  .get(logger, tagsController.getAllTags)
  .post(logger, tagsController.createTag);

router
  .route("/:id")
  .put(logger, tagsController.updateTag)
  .get(logger, tagsController.getTagById)
  .delete(logger, tagsController.deleteTag);

module.exports = router;
