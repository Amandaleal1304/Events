import { DataTypes } from "sequelize";
import sequelize from "../database/mysql.js";

const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
});

export default Category;