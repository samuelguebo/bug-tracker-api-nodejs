import { DataTypes } from "sequelize";
import sequelize from './sequelizeHelper.js';

const Project = sequelize.define('Project', {
    title:DataTypes.STRING
  });

export default Project
