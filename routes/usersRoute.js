const express = require("express");
const router = express.Router();
const usersRouteController = require("../controllers/usersRouteController");
const { logger } = require("../middlewares/logger");

router
  .route("/")
  .get(logger, usersRouteController.getUsers)
  .post(logger, usersRouteController.createUser);

router
  .route("/:id")
  .put(logger, usersRouteController.updateUser)
  .delete(logger, usersRouteController.deleteUser);

module.exports = router;
