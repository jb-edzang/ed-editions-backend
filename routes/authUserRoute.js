const express = require("express");
const router = express.Router();
const authUserController = require("../controllers/authUserController");

router.post("/", authUserController.authUser);

module.exports = router;
