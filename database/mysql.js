// banco eventos
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',

    username: 'root',

    password: 'root',

    database: 'eventos'

});

export async function syncer() {

    try {

        await sequelize.authenticate();

        await sequelize.sync();

    } catch (error) {

        console.log('Erro ao acessar a base de dados.');

        return false;

    }

    return true;

}



export default sequelize;