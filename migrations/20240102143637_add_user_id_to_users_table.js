const up = async (knex) => {
  await knex.schema.alterTable("users", (table) => {
    table.integer("user_id").unsigned(); // Ajout de la colonne user_id dans la table users

    // Contrainte de clé étrangère pour user_id faisant référence à books(user_id)
    table.foreign("user_id").references("id").inTable("books");
  });
};

const down = async (knex) => {
  await knex.schema.alterTable("users", (table) => {
    table.dropForeign(["user_id"]);
    table.dropColumn("user_id");
  });
};

module.exports = { up, down };
