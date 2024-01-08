require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const knex = require("knex");
const { Model } = require("objection");

const knexConfig = require("./knexfile");
const { logger } = require("./middlewares/logger");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const dbConn = knex(knexConfig.development);

Model.knex(dbConn);

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger);

app.get("/users", async (req, res) => {
  try {
    const users = await dbConn.select().from("users");
    res.json(users);
    console.log("conneted to empreintes DB");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/users", require("./routes/usersRoute"));
app.use("/signUp", require("./routes/signUpRoute"));
app.use("/signIn", require("./routes/signInRoute"));
app.use("/books", require("./routes/bookRoute"));
app.use("/book", require("./routes/api/books"));
app.use("/api/photos", require("./routes/photosRoute"));
app.use("/api/comments", require("./routes/commentRoute"));
app.use("/api/auth", require("./routes/authUserRoute"));
app.use("/api", require("./routes/api/user"));

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
