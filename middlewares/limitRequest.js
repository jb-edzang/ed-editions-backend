const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

// Création d'un middleware rate-limit pour limiter les requêtes à 100 par heure (par IP)
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  //max: 100, // nombre maximum de requêtes autorisées par window par msg
  message:
    "Trop de requêtes de cette adresse IP. Veuillez réessayer plus tard.",
});

// Appliquer le middleware rate-limit à toutes les requêtes
app.use(limiter);

// ... Autres routes et configurations

// Lancement du serveur
app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});
