const express = require("express");
const router = express.Router();
const usersRoute = require("../../routes/usersRoute");

router.use("/users", usersRoute);

module.exports = router;
