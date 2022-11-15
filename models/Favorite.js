  const { Model, DataTypes } = require('sequelize');
  const sequelize = require('../config/connection');

  class Favorite extends Model { }

  Favorite.init(
      {
          id: {
              type: DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
          },
          name: {
              type: DataTypes.STRING,
              allowNull: false
          },
          date_favorite: {
              type: DataTypes.STRING,
              allowNull: false
          },
          url: {
              type: DataTypes.STRING,
              allowNull: false
          },

          // this is the foreign key
          user_id: {
              type: DataTypes.INTEGER,
              references: {
                  model: 'user',
                  key: 'id'
              }
          }
      },
      {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: 'favorite'
      }
  );

  module.exports = Favorite;