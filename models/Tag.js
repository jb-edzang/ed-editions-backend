const { Model } = require("objection");

class Tag extends Model {
  static get tableName() {
    return "tags";
  }

  static get relationMappings() {
    return {
      photos: {
        relation: Model.ManyToManyRelation,
        modelClass: Photo,
        join: {
          from: "tags.id",
          through: {
            from: "photos_tags.tag_id",
            to: "photos_tags.photo_id",
          },
          to: "photos.id",
        },
      },
    };
  }
}

module.exports = Tag;
