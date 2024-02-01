require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const knex = require("knex");

const bodyParser = require("body-parser");

const apiRoutes = require("./middlewares/apiRoutes");
const uploadMiddleware = require("./middlewares/uploadMiddleware");
const booksRoutes = require("./routes/booksRoute");

const cors = require("cors");
const allowedOrigins = require("./config/allowedOrigins");

const knexConfig = require("./knexfile");
const dbConn = knex(knexConfig.development);

const { Model } = require("objection");
class PhotoModel extends Model {
  static get tableName() {
    return "photos";
  }
}
Model.knex(dbConn);
const Photo = require("./models/Photo");

const { logger } = require("./middlewares/logger");
const corsOptions = require("./middlewares/corsOptions");
const cookieParser = require("cookie-parser");

// Pour les logs d'erreurs détaillés
const morgan = require("morgan");
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "Something went wrong!" });
});

// Pour l'upload des fichiers
const multer = require("multer");
const storage = multer.memoryStorage(); // stocke les fichiers en mémoire pour obtenir les données binaires
const upload = multer({ storage: storage });

// Upload par fs node.js
const readImagesFromFolder = require("./ressourcesDB/insertPhoto");
const insertPhotosIntoDatabase = require("./ressourcesDB/insertPhoto");
insertPhotosIntoDatabase();

const insertPhoto = require("./ressourcesDB/insertPhoto");
insertPhoto(Model);

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("combined")); // format "combined" ou autre format
// Utilisez body-parser pour gérer les requêtes avec des corps volumineux
app.use(bodyParser.json({ limit: "50mb" })); // Ajustez la limite selon vos besoins
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // Ajustez la limite selon vos besoins

app.use("/", express.static(path.join(__dirname, "/public")));

// Pour les routes
app.use("/auth", require("./routes/authUserRoute"));
app.use("/books", booksRoutes);
app.use("/books", require("./routes/booksRoute"));
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

// Endpoint pour gérer la soumission du formulaire uploadPhoto
app.post("/api/photos", upload.single("image"), async (req, res) => {
  try {
    const { title, description, user_id, price, themes, tags } = req.body;
    const imageBuffer = req.file.buffer; // Données binaires de l'image

    // Enregistrer l'image dans la base de données
    const insertedPhoto = await Photo.query().insert({
      title,
      description,
      user_id,
      price,
      themes: JSON.stringify(themes),
      tags: JSON.stringify(tags),
      image_data: imageBuffer.toString("base64"), // Conversion des données binaires en base64
    });

    res.json(insertedPhoto);
  } catch (error) {
    console.error("Error uploading photo:", error);
    res.status(500).json({ error: "Error uploading photo" });
  }
});

// Middelware pour capturer les erreurs 404
app.use((req, res, next) => {
  const isApiRoute = req.url.startsWith("/api");
  if (!isApiRoute) {
    res.status(404);
    if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
      res.json({ error: "404 Not Found" });
    } else {
      res.type("txt").send("404 Not Found");
    }
  } else {
    // Passer la demande aux routes API
    next();
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
