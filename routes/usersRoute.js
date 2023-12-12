const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { logger } = require("../middlewares/logger");

router
  .route("/")
  .get(logger, usersController.getUsers)
  .post(logger, usersController.createUser);

router
  .route("/:id")
  .put(logger, usersController.updateUser)
  .delete(logger, usersController.deleteUser);

module.exports = router;
