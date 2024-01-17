const express = require("express");
const router = express.Router();
const usersRoute = require("../usersRoute");
const usersRouteController = require("../../controllers/usersRouteController");

router.get("/", usersRouteController.getUsers);
router.post("/", usersRouteController.createUser);

module.exports = router;
