const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/signUpController");

router.post("/", (req, res) => {
  signUpController.createUser(req, res);
});

module.exports = router;
