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
          args : true,
          msg : "Full name is required"
        },
        notEmpty : {
          args : true,
          msg : "Full name is required"
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
          args : true,
          msg : "Email is required"
        },
        notEmpty : {
          args : true,
          msg : "Email is required"
        },
        isEmail : {
          args : true,
          msg: "Email format is incorrect"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "Password is required"
        },
        notEmpty : {
          args : true,
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
          args : true,
          msg : "Address is required"
        },
        notEmpty : {
          args : true,
          msg : "Address is required"
        }
      }
    },
    role: DataTypes.STRING,
  }, {
    hooks : {
      beforeCreate : (user) => {
        user.role = "staff"
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};