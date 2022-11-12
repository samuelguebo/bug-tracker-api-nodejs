import { DataTypes } from "sequelize";
import Project from "./project.js";
import sequelize from './sequelizeHelper.js';
import User from "./user.js";

const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
});

// Associations

Task.User = Task.belongsTo(User)
Task.belongsToMany(Project, { through: 'task_project' })
export default Task