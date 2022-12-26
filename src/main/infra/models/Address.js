const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const Adreess = sequelize.define('Adress', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    zipcode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    street: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    number: {
      type: Sequelize.STRING,
      allowNull: false,
    },

  }, {});





  Address.associate = function (models) {
    // associations can be defined here
    Address.belongsTo(model.User, { foreignKey: 'user_id', as: 'user' });
  };

     return User

}
