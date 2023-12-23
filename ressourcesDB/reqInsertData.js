import { faker } from "@faker-js/faker"; // ...

const main = async () => {
  try {
    const photosData = Array.from({ length: 5 }, (_, index) => ({
      title: faker.lorem.words(3),
      imageUrl: faker.image.imageUrl(),
      userId: faker.datatype.number({ min: 1, max: 10 }), // Remplacez par vos utilisateurs
    }));

    const commentsData = Array.from({ length: 10 }, () => ({
      photoId: faker.datatype.number({ min: 1, max: 5 }), // Remplacez par vos photos
      userId: faker.datatype.number({ min: 1, max: 10 }), // Remplacez par vos utilisateurs
      content: faker.lorem.sentence(),
    }));

    // ...
  } catch (error) {
    console.error("Erreur :", error);
  }
};

main();
