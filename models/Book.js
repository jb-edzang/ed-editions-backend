const { Model } = require("objection");

class Book extends Model {
  static get tableName() {
    return "books";
  }

  static get relationMappings() {
    const User = require("./User");

    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "books.user_id",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Book;
