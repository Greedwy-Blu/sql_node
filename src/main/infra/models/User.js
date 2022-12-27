module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
      },
        name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    }, {});

User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
  };

  return User;
}
