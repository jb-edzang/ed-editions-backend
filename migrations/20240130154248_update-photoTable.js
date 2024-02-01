const up = async (knex) => {
  await knex.schema.table("photos", (table) => {
    // Supprimer la colonne "image_url"
    table.dropColumn("image_url");

    // Ajouter la colonne "image_data" de type "binary"
    table.binary("image_data").notNullable();
  });
};

const down = async (knex) => {
  // Opération inverse lors du rollback
  await knex.schema.table("photos", (table) => {
    // Supprimer la colonne "image_data"
    table.dropColumn("image_data");

    // Ajouter à nouveau la colonne "image_url" (si nécessaire)
    table.string("image_url").notNullable().unique();
  });
};

module.exports = { up, down };
