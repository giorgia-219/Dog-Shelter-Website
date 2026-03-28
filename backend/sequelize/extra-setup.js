// Additional setup might go here
function applyExtraSetup(sequelize) {
    const { user, post } = sequelize.models;

	user.hasMany(post);
	post.belongsTo(user);
}

module.exports = { applyExtraSetup };