// We export a function that defines the model.
const { DataTypes } = require('sequelize');

// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('user', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
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
		preferredAge: DataTypes.STRING,
		preferredSize: DataTypes.STRING,
		preferredGender: DataTypes.STRING,
		preferredActivityLevel: DataTypes.STRING
	});
};