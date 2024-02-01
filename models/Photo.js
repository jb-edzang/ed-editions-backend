const dbConn = require("../config/dbConn");
const { Model } = require("objection");
Model.knex(dbConn);

if (process.env.NODE_ENV !== "production") {
  dbConn.on("query", (query) => {
    console.log(query.sql);
  });
}

class Photo extends Model {
  static get tableName() {
    return "photos";
  }

  static get relationMappings() {
    const User = require("./User");
    const Theme = require("./Theme");
    const Tag = require("./Tag");

    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "photos.user_id",
          to: "users.id",
        },
      },
      themes: {
        relation: Model.ManyToManyRelation,
        modelClass: Theme,
        join: {
          from: "photos.id",
          through: {
            from: "photos_themes.photo_id",
            to: "photos_themes.theme_id",
          },
          to: "themes.id",
        },
      },
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: Tag,
        join: {
          from: "photos.id",
          through: {
            from: "photos_tags.photo_id",
            to: "photos_tags.tag_id",
          },
          to: "tags.id",
        },
      },
    };
  }
}

module.exports = Photo;
