const express = require("express");
const router = express.Router();
const tagsController = require("../controllers/tagsController");

router
  .route("/tags")
  .get((req, res) => {
    tagsController.getAllTags(req, res);
  })
  .post((req, res) => {
    tagsController.createTag(req, res);
  });

router
  .route("/tags/:id")
  .put((req, res) => {
    tagsController.updateTag(req, res);
  })
  .patch((req, res) => {
    tagsController.patchTag(req, res);
  })
  .delete((req, res) => {
    tagsController.deleteTag(req, res);
  });

module.exports = router;
