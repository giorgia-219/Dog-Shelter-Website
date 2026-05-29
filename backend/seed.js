// script to populate the database with sample dog data (temporary for testing and debugging)

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
        description: 'My absolute favorite thing is playing chase in the fenced yard with my foster siblings[cite: 349]. I am fast and love to zoom around[cite: 350]!',
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