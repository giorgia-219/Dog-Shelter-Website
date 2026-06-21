const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('inquiries', {

		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},

		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		email: DataTypes.STRING,

    	isFirstTimeOwner: DataTypes.BOOLEAN,
		hasCurrentPets: DataTypes.BOOLEAN,
		previousPets: DataTypes.STRING,
		currentPets: DataTypes.STRING,
		dogBreed: DataTypes.STRING,
		dogAge: DataTypes.STRING,
		dogGender: DataTypes.STRING,
		dogSterilized: DataTypes.BOOLEAN,

		preferredAge: DataTypes.STRING,
		preferredGender: DataTypes.STRING,
		preferredSize: DataTypes.STRING,
		preferredActivityLevel: DataTypes.STRING,

		dogSpace: DataTypes.STRING,
		dogOwners: DataTypes.STRING,
		dogTraining: DataTypes.STRING
	});
};