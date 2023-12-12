const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig);
const dbConn = knex;

const addPhotos = async (photos) => {
  try {
    const insertedPhotos = await Promise.all(
      photos.map(async (photo) => {
        const insertedPhoto = await knex("photos").insert(photo).returning("*");
        return insertedPhoto[0];
      })
    );
    return insertedPhotos;
  } catch (error) {
    throw error;
  }
};

const addComments = async (comments) => {
  try {
    const insertedComments = await Promise.all(
      comments.map(async (comment) => {
        const limitedContent =
          comment.content.length > 25
            ? comment.content.substring(0, 25) + "..."
            : comment.content;

        const insertedComment = await knex("comments")
          .insert({
            photo_id: comment.photoId,
            user_id: comment.userId,
            content: limitedContent,
          })
          .returning("*");
        return insertedComment[0];
      })
    );
    return insertedComments;
  } catch (error) {
    throw error;
  }
};

const main = async () => {
  try {
    const photosData = [
      {
        title: "La Grave Tunnel",
        imageUrl:
          "/Users/jean/empreintes/views/public/images/La Grave Tunnel.jpg",
        userId: 1,
      },
      {
        title: "Mont Blanc",
        imageUrl: "/Users/jean/empreintes/views/public/images/Mont Blanc.jpg",
        userId: 2,
      },
      // ... Ajoutez autant d'objets pour les photos que nécessaire
    ];

    const commentsData = [
      { photoId: 1, userId: 1, content: "Lorem ipsum " },
      {
        photoId: 2,
        userId: 2,
        content: "Lorem ipsum",
      },
      // ... Ajoutez autant d'objets pour les commentaires que nécessaire
    ];

    const insertedPhotos = await addPhotos(photosData);
    const insertedComments = await addComments(commentsData);

    console.log("Photos insérées :", insertedPhotos);
    console.log("Commentaires insérés :", insertedComments);
  } catch (error) {
    console.error("Erreur :", error);
  }
};

main();
