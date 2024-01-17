const knex = require("knex");
const config = require("../knexfile");

// Initialisez Knex avec la configuration appropriée
const dbConn = knex(config.development); // Ou tout autre environnement que vous utilisez

module.exports = dbConn; // Exportez db pour pouvoir l'importer dans d'autres fichiers de votre application
