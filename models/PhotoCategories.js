const { Model } = require("objection");

class PhotoCategories extends Model {
  static get tableName() {
    return "photo_categories";
  }

  static get relationMappings() {
    return {
      photo: {
        relation: Model.BelongsToOneRelation,
        modelClass: Photo,
        join: {
          from: "photo_categories.photo_id",
          to: "photos.id",
        },
      },
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: "photo_categories.category_id",
          to: "categories.id",
        },
      },
    };
  }
}

module.exports = PhotoCategories;
