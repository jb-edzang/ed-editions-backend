require("dotenv").config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER || "username",
      password: process.env.DATABASE_URI || "pwd",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./migrations",
    },
  },
};
