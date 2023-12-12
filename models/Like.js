const { Model } = require("objection");

class Like extends Model {
  static get tableName() {
    return "likes";
  }

  static get relationMappings() {
    const User = require("./User");
    const Photo = require("./Photo");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "likes.user_id",
          to: "users.id",
        },
      },
      photo: {
        relation: Model.BelongsToOneRelation,
        modelClass: Photo,
        join: {
          from: "likes.photo_id",
          to: "photos.id",
        },
      },
    };
  }
}

module.exports = Like;
