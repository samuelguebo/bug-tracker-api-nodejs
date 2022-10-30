import { DataTypes } from "sequelize";
import sequelize from './sequelizeHelper.js';

const Category = sequelize.define('Category', {
    title:DataTypes.STRING
  });

export default Category
