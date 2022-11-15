const { Model, DataTypes } = require('sequelize');
// importing bcrypt package to protect the password
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  // password validator for logging in - comparing the password saved in db(this.password) against the password provided by user(loginPassword)
  checkPassword(loginPassword) {
      return bcrypt.compareSync(loginPassword, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
     // define a username column
     username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  },
  {
    // hashing the password to save the encrypted version for security
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
      },
        // set up beforeUpdate lifecycle "hook" functionality
      async beforeUpdate(updatedUserData) {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          return updatedUserData;
      }
    },

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;
