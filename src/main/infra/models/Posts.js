const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	const Posts = sequelize.define(
		'Posts',
		{
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			content: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		},
		{}
	);

	Posts.associate = function (models) {
		// associations can be defined here
		Posts.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
	};

	return Posts;
};
