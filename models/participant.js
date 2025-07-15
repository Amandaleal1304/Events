import {DataTypes} from "sequelize";
import sequelize from "../database/mysql.js";

const Participant = sequelize.define("Participant", {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    telephone: DataTypes.STRING
   });
   
   export default Participant;