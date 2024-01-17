const { Model } = require("objection");
//const { knex } = require("../config/dbConn");

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    const Book = require("./Book");
    const Photo = require("./Photo");
    const Like = require("./Like");
    const Comment = require("./Comment");

    return {
      books: {
        relation: Model.HasManyRelation,
        modelClass: Book,
        join: {
          from: "users.id",
          to: "books.user_id",
        },
      },
      photos: {
        relation: Model.HasManyRelation,
        modelClass: Photo,
        join: {
          from: "users.id",
          to: "photos.user_id",
        },
      },
      likes: {
        relation: Model.HasManyRelation,
        modelClass: Like,
        join: {
          from: "users.id",
          to: "likes.user_id",
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "users.id",
          to: "comments.user_id",
        },
      },
    };
  }
}

module.exports = User;
