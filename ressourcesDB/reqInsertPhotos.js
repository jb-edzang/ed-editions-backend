const knex = require("knex")(knexConfig);

// Insérer une nouvelle photo dans la table photos
const addPhoto = async (title, description, imageUrl, userId) => {
  try {
    const insertedPhoto = await knex("photos")
      .insert({
        title,
        description,
        image_url: imageUrl,
        user_id: userId,
      })
      .returning("*"); // Retourne les données de la photo insérée
    return insertedPhoto;
  } catch (error) {
    throw error;
  }
};

// Insérer un nouveau commentaire dans la table comments
const addComment = async (photoId, userId, content) => {
  try {
    const insertedComment = await knex("comments")
      .insert({
        photo_id: photoId,
        user_id: userId,
        content,
      })
      .returning("*"); // Retourne les données du commentaire inséré
    return insertedComment;
  } catch (error) {
    throw error;
  }
};

// Utilisation des fonctions d'insertion
const main = async () => {
  try {
    // Insérer une photo
    const newPhoto = await addPhoto(
      "Titre de la photo",
      "Description de la photo",
      "url_de_l_image",
      1 /* userId */
    );
    console.log("Nouvelle photo insérée :", newPhoto);

    // Insérer un commentaire pour cette photo
    const newComment = await addComment(
      newPhoto[0].id /* photoId */,
      1 /* userId */,
      "Ceci est un commentaire"
    );
    console.log("Nouveau commentaire inséré :", newComment);
  } catch (error) {
    console.error("Erreur lors de l'insertion :", error);
  } finally {
    await knex.destroy();
  }
};

main();
