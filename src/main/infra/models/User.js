const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define(
		'User',
		{
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			senha: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		},
		{}
	);

	User.associate = function (models) {
		// associations can be defined here
		User.hasMany(models.Posts, { foreignKey: 'user_id', as: 'posts' });
	};

	return User;
};
