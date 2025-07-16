import { DataTypes } from "sequelize";
import sequelize from "../database/mysql.js";

const User = sequelize.define('User', {
    name: DataTypes.STRING,
    user_name: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING
});

export default User;