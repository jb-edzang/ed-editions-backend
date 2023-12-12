const { Model } = require("objection");

class Comment extends Model {
  static get tableName() {
    return "comments";
  }

  static get relationMappings() {
    const User = require("./User");
    const Photo = require("./Photo");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "comments.user_id",
          to: "users.id",
        },
      },
      photo: {
        relation: Model.BelongsToOneRelation,
        modelClass: Photo,
        join: {
          from: "comments.photo_id",
          to: "photos.id",
        },
      },
    };
  }
}

module.exports = Comment;
