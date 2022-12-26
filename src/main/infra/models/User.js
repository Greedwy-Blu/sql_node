module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
      },
        name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },

    }, {});

User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(model.User, { foreignKey: 'user_id', as: 'user' });
  };

    return User
}
