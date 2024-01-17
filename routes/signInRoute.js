const express = require("express");
const router = express.Router();
const signInController = require("../controllers/signInController");

router.post("/", (req, res) => {
  signInController.authUser(req, res);
});

module.exports = router;
