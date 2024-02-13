'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    fullName: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Full name is required"
        },
        notEmpty : {
          mssg : "Full name is required"
        }
      }

    },
    email: {
      type : DataTypes.STRING,
      unique : {
        args : true,
        msg : "Email has been used"
      },
      allowNull : false,
      validate : {
        notNull : {
          msg : "Email is required"
        },
        notEmpty : {
          msg : "Email is required"
        },
        isEmail : {
          msg: "Email format is incorrect"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Password is required"
        },
        notEmpty : {
          msg : "Password is required"
        }
      }
    },
    phoneNumber: DataTypes.STRING,
    address: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Address is required"
        },
        notEmpty : {
          msg : "Address is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};