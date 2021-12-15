const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Category extends Model {}

// code: 'ER_BAD_NULL_ERROR',
//     errno: 1048,
//     sqlState: '23000',
//     sqlMessage: "Column 'id' cannot be null",
//     sql: 'INSERT INTO `category` (`id`) VALUES (NULL),(NULL),(NULL),(NULL),(NULL);',
//     parameters: undefined

Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
      // testing default null value - ERRNO: 1067 / 1364
      // defaultValue: null,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    modelName: "category",
  }
);

module.exports = Category;
