const express = require("express");
const router = express.Router();
const usersApiRoute = require("../routes/api/users");

// Importez toutes les routes nécessaires
const authUserRoute = require("../routes/authUserRoute");
const bookRoute = require("../routes/bookRoute");
const commentRoute = require("../routes/commentRoute");
const photosRoute = require("../routes/photosRoute");
const usersRoute = require("../routes/usersRoute");
const signUpRoute = require("../routes/signUpRoute");
const signInRoute = require("../routes/signInRoute");
const themeRoute = require("../routes/themeRoute");
const tagsRoute = require("../routes/tagsRoute");
const likesRoute = require("../routes/likesRoute");

// Associez les routes à leurs chemins respectifs
router.use("/auth", authUserRoute);
router.use("/books", bookRoute);
router.use("/comment", commentRoute);
router.use("/photo", photosRoute);
router.use("/users", usersRoute);
router.use("/signUp", signUpRoute);
router.use("/signIn", signInRoute);
router.use("/theme", themeRoute);
router.use("/tags", tagsRoute);
router.use("/likes", likesRoute);

module.exports = router;
