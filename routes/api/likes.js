const express = require("express");
const router = require("express").Router();
const likesController = require("../../controllers/likesController");

router.get("/", likesController.getLike);
router.post("/", likesController.createLike);

module.exports = router;
