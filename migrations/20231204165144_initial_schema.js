/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("user").notNullable().unique();
    table.string("email").notNullable().unique();
    table.string("pwdHash").notNullable().unique();
    table.timestamp(true, true);
  });
  await knex.schema.createTable("signUp", (table) => {
    table.increments("id");
    table.string("username").notNullable().unique();
    table.string("email").notNullable().unique();
    table.string("pwdHash").notNullable().unique();
    table.timestamp(true, true);
  });
  await knex.schema.createTable("signIn", (table) => {
    table.increments("id");
    table.string("username").notNullable().unique();
    table.string("email").notNullable().unique();
    table.string("pwdHash").notNullable().unique();
    table.timestamp(true, true);
  });
  await knex.schema.createTable("books", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable().unique();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    table.text("description").notNullable();
    table.date("publication_date").notNullable().unique();
  });
  await knex.schema.createTable("themes", (table) => {
    table.increments("id");
    table.string("name").notNullable();
  });
  await knex.schema.createTable("photos", (table) => {
    table.increments("id");
    table.string("title").notNullable().unique();
    table.text("description").notNullable();
    table.string("image_url").notNullable().unique();
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.dateTime("created_at").defaultTo(knex.fn.now());
    table.dateTime("updated_at").defaultTo(knex.fn.now());
    table.float("price");
  });
  await knex.schema.createTable("photos_books", (table) => {
    table.increments("id");
    table.integer("photo_id").unsigned().references("id").inTable("photos");
    table.integer("theme_id").unsigned().references("id").inTable("themes");
  });
  await knex.schema.createTable("photos_themes", (table) => {
    table.increments("id");
    table.integer("photo_id").unsigned().references("id").inTable("photos");
    table.integer("theme_id").unsigned().references("id").inTable("themes");
  });
  await knex.schema.createTable("likes", (table) => {
    table.increments("id");
    table.integer("photo_id").unsigned().references("id").inTable("photos");
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.unique(["photo_id", "user_id"]);
  });
  await knex.schema.createTable("tags", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable().unique();
  });
  await knex.schema.createTable("photos_tags", (table) => {
    table.increments("id").primary();
    table.integer("photo_id").unsigned().references("id").inTable("photos");
    table.integer("tag_id").unsigned().references("id").inTable("tags");
  });

  await knex.schema.createTable("categories", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable().unique();
  });
  await knex.schema.createTable("photo_categories", (table) => {
    table.increments().primary();
    table.integer("photo_id").unsigned().references("id").inTable("photos");
    table
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("categories");
  });
  await knex.schema.createTable("comments", (table) => {
    table.increments("id").primary();
    table.integer("photo_id").unsigned().references("id").inTable("photos");
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.text("content").notNullable().unique();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = async (knex) => {
  await knex.schema.dropTableIfExists("comments");
  await knex.schema.dropTableIfExists("photo_categories");
  await knex.schema.dropTableIfExists("categories");
  await knex.schema.dropTableIfExists("photos_tags");
  await knex.schema.dropTableIfExists("tags");
  await knex.schema.dropTableIfExists("likes");
  await knex.schema.dropTableIfExists("photos_themes");
  await knex.schema.dropTableIfExists("photos_books");
  await knex.schema.dropTableIfExists("photos");
  await knex.schema.dropTableIfExists("themes");
  await knex.schema.dropTableIfExists("books");
  await knex.schema.dropTableIfExists("signIn");
  await knex.schema.dropTableIfExists("signUp");
  await knex.schema.dropTableIfExists("users");
};

module.exports = { up, down };
