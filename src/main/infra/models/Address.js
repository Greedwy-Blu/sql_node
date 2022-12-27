const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, {});





  Address.associate = function (models) {
    // associations can be defined here
    Address.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

     return Address

}
