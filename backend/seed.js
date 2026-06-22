// populate the database with sample dog data

const sequelize = require('./sequelize');

const sampleDogs = [
    {
        name: 'Ettore',
        age: '5 y/o',
        size: 'M',
        weight: '15kg',
        gender: 'M',
        description: 'A loving dog looking for a good match.',
        imageUrl: 'img/dogImg/ettore.jpg' 
    },
    {
        name: 'Tommy',
        age: '8 y/o',
        size: 'M',
        weight: '14 kg',
        gender: 'M',
        description: 'My absolute favorite thing is playing chase in the fenced yard with my foster siblings. I am fast and love to zoom around!',
        imageUrl: 'img/dogImg/tommy.jpg'
    },
    {
        name: 'Cesare',
        age: '3 y/o', 
        size: 'L',
        weight: '25kg',
        gender: 'M',
        description: 'A gentle giant looking for a calm home.',
        imageUrl: 'img/dogImg/cesare.jpg'
    },
    {
        name: 'Thor',
        age: '4 y/o',
        size: 'M',
        weight: '20kg',
        gender: 'M',
        description: 'Energetic and ready for long hikes in the mountains.',
        imageUrl: 'img/dogImg/thor.jpg'
    },
    {
        name: 'Circe',
        age: '2 y/o',
        size: 'S',
        weight: '8kg',
        gender: 'F',
        description: 'Sweet and cuddly, perfect for apartment living.',
        imageUrl: 'img/dogImg/circe.jpg'
    },
    {
        name: 'Bruschetta',
        age: '2 y/o',
        size: 'L',
        weight: '22kg',
        gender: 'F',
        description: 'Bruschetta is the kind of dog who quietly steals hearts. She might be a little shy when meeting new people, but give her a few minutes and you will discover a gentle, affectionate companion who simply wants to be close to someone she can trust. Be it a walk in the park or a lazy afternoon on the couch, Luna is happiest with her favourite human. She is waiting for a family to show her that home is more than just a place.',
        imageUrl: 'img/dogImg/bruschetta.jpg'
    },
    {
        name: 'Chicco',
        age: '13 y/o',
        size: 'S',
        weight: '6kg',
        gender: 'M',
        description: "A tiny little coffee bean overflowing with happy energy! He's looking for an active family ready to show him the world.",
        imageUrl: 'img/dogImg/chicco.jpg'
    },
    {
        name: 'Bella',
        age: '3 y/o',
        size: 'L',
        weight: '26kg',
        gender: 'F',
        description: "Beautiful by name, beautiful by nature. She has a magical way of making you feel like the most important person in the world with just one look",
        imageUrl: 'img/dogImg/bella.jpg'
    }

];

async function seedDatabase() {
    try {
        // Check connection
        await sequelize.authenticate();
        console.log('Connection to SQLite established.');

        // Sync the database (this creates the tables if they don't exist)
        await sequelize.sync();

        // Bulk insert the dogs
        await sequelize.models.dogs.bulkCreate(sampleDogs);
        console.log('Successfully seeded the database with sample dogs!');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Close the connection so the script finishes
        await sequelize.close();
    }
}

seedDatabase();