const { Model } = require("objection");

class Category extends Model {
  static get tableName() {
    return "categories";
  }

  static get relationMappings() {
    return {
      photos: {
        relation: Model.ManyToManyRelation,
        modelClass: Photo,
        join: {
          from: "categories.id",
          through: {
            from: "photo_categories.category_id",
            to: "photo_categories.photo_id",
          },
          to: "photos.id",
        },
      },
    };
  }
}

module.exports = Category;
