const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			senha: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{}
	);

	User.beforeCreate(async (user) => {
		user.password = await user.generatePasswordHash();
	});
	User.prototype.generatePasswordHash = function () {
		if (this.password) {
			return bcrypt.hash(this.password, 10);
		}
	};

	User.associate = function (models) {
		// associations can be defined here
		User.hasMany(models.Posts, { foreignKey: 'user_id', as: 'posts' });
	};

	return User;
};
