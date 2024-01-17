require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const knex = require("knex");

const apiRoutes = require("./middlewares/apiRoutes");

const cors = require("cors");
const allowedOrigins = require("./config/allowedOrigins");

const knexConfig = require("./knexfile");
const dbConn = knex(knexConfig.development);

const { Model } = require("objection");
Model.knex(dbConn);

const { logger } = require("./middlewares/logger");
const corsOptions = require("./middlewares/corsOptions");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", express.static(path.join(__dirname, "/public")));

// Pour les routes
app.use("/auth", require("./routes/authUserRoute"));
app.use("/book", require("./routes/bookRoute"));
app.use("/comment", require("./routes/commentRoute"));
app.use("/likes", require("./routes/likesRoute"));
app.use("/photos", require("./routes/photosRoute"));
app.use("/signin", require("./routes/signInRoute"));
app.use("/signup", require("./routes/signUpRoute"));
app.use("/tags", require("./routes/tagsRoute"));
app.use("/theme", require("./routes/themeRoute"));
app.use("/users", require("./routes/usersRoute"));

// Pour les routes API
app.use("/api", apiRoutes);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);

  dbConn
    .raw("SELECT 1+1 as result")
    .then(() => {
      console.log("Server is connected to Empreintes DB !");
    })
    .catch((err) => {
      console.error("Connection to Empreintes failed:", err);
    });
});
