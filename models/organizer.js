import { DataTypes } from "sequelize";
import sequelize from "../database/mysql.js";

const Organizer = sequelize.define('Organizer', {
    name: DataTypes.STRING,
    contact: DataTypes.STRING,
    email: DataTypes.STRING,
});

export default Organizer;