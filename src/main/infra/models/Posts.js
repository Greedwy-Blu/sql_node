const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },


  }, {});





  Posts.associate = function (models) {
    // associations can be defined here
    Posts.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

     return Posts

}
