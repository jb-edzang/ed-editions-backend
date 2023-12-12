const { Model } = require("objection");

class Theme extends Model {
  static get tableName() {
    return "themes";
  }

  static get relationMappings() {
    return {
      photos: {
        relation: Model.ManyToManyRelation,
        modelClass: Photo,
        join: {
          from: "themes.id",
          through: {
            from: "photo_themes.theme_id",
            to: "photo_themes.photo_id",
          },
          to: "photos.id",
        },
      },
    };
  }
}

module.exports = Theme;
