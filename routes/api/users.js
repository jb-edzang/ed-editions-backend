const express = require("express");
const router = express.Router();
const usersRoute = require("../usersRoute");
const usersRouteController = require("../../controllers/usersRouteController");

router.get("/", usersRouteController.getUsers);
router.post("/", usersRouteController.createUser);
router.put("/", usersRouteController.updateUser);
router.delete("/", usersRouteController.deleteUser);

module.exports = router;
