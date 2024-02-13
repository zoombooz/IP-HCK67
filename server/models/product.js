'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Image, {
        foreignKey : "productId"
      })

      Product.belongsToMany
    }
  }
  Product.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false, 
      validate : {
        notNull : {
          msg : "Title is required"
        },
        notEmpty : {
          msg : "Title is required"
        }
      }
    },
    description: {
      type : DataTypes.TEXT,
      allowNull : false, 
      validate : {
        notNull : {
          msg : "Description is required"
        },
        notEmpty : {
          msg : "Description is required"
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull : false, 
      validate : {
        notNull : {
          msg : "Price is required"
        },
        notEmpty : {
          msg : "Price is required"
        }
      }
    },
    discountPercentage: {
      type : DataTypes.DECIMAL
    },
    rating: {
      type : DataTypes.DECIMAL
    },
    stock: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Stock is required"
        },
        notEmpty : {
          msg : "Stock is required"
        }
      }
    },
    brand: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Brand is required"
        },
        notEmpty : {
          msg : "Brand is required"
        }
      }
    },
    category: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Category is required"
        },
        notEmpty : {
          msg : "Category is required"
        }
      }
    },
    thumbnail: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Thumbnail is required"
        },
        notEmpty : {
          msg : "Thumbnail is required"
        }
      }
    }
  }, {
    hooks : {
      beforeCreate : () => {
        if (!this.discountPercentage){
          this.discountPercentage = 0
        }
      }
    },
    sequelize,
    modelName: 'Product',
  });
  return Product;
};