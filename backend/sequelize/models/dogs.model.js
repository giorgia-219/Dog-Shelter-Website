// We export a function that defines the model.
const { DataTypes } = require("sequelize");

// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('post', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: DataTypes.STRING,
        size: DataTypes.STRING,
        age: DataTypes.INTEGER,
		weight: DataTypes.INTEGER,
		gender: DataTypes.STRING,
		description: DataTypes.STRING,
		imageUrl: DataTypes.STRING
	});
};