import { DataTypes } from "sequelize";
import utils from "../utils/utils.js";
import sequelize from './sequelizeHelper.js';
import Post from "./post.js";

const User = sequelize.define('User', {
    // Model attributes are defined here
    firstName:DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks : {
      beforeCreate : async (record, options) => {
        // Hash password 
        const hash = record.dataValues.password = await utils.hashPassword(record.dataValues.password)
        record.dataValues.password = hash
      },
  }});
// Association
User.hasOne(Post)
export default User 
