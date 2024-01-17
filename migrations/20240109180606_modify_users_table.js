const up = async (knex) => {
  await knex.schema.alterTable("users", function (table) {
    table.renameColumn("user", "username"); // Renommer la colonne 'user' en 'username'
  });
};

const down = async (knex) => {
  await knex.schema.alterTable("users", function (table) {
    table.renameColumn("username", "user"); // Revenir en arrière si nécessaire
  });
};

module.exports = { up, down };
