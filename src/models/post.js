import { DataTypes } from "sequelize";
import Category from "./category.js";
import sequelize from './sequelizeHelper.js';

const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    pubDate: DataTypes.STRING,
});

// Associations
Post.belongsToMany(Category, { through: 'post_category' })
export default Post