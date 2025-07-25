import { DataTypes } from "sequelize";
import sequelize from "../database/mysql.js";

const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    city: DataTypes.STRING
});

export default Event;