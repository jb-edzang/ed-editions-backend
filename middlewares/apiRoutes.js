const express = require("express");
const router = express.Router();
const usersApiRoute = require("../routes/api/users");

// Importez toutes les routes nécessaires
const authUserRoute = require("../routes/authUserRoute");
const booksRoute = require("../routes/booksRoute");
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
router.use("/books", booksRoute);
router.use("/comment", commentRoute);
router.use("/photo", photosRoute);
router.use("/users", usersRoute);
router.use("/signUp", signUpRoute);
router.use("/signIn", signInRoute);
router.use("/theme", themeRoute);
router.use("/tags", tagsRoute);
router.use("/likes", likesRoute);

module.exports = router;
