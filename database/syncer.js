import sequelize from "./mysql.js";
import Event from "../models/event.js";
import Organizer from "../models/organizer.js";
import Category from "../models/category.js";
import Participant from "../models/participant.js";

async function syncer() {
    try {
        await sequelize.authenticate();

        // Relação 1:N: Organizador → Evento
        // Um organizador pode ter vários eventos, mas um evento pertence a um único organizador.
        Event.belongsTo(Organizer);
        Organizer.hasMany(Event);

        // Relação 1:N: Categoria → Evento
        // Uma categoria pode ter vários eventos, mas um evento pertence a uma única categoria.
        Event.belongsTo(Category);
        Category.hasMany(Event);

        // Relação N:N: Participante ↔ Evento
        // Um evento pode ter vários participantes e um participante pode estar em vários eventos.
        // Isso cria uma tabela intermediária chamada 'Event_Participant'.
        Event.belongsToMany(Participant, { through: 'Event_Participant' });
        Participant.belongsToMany(Event, { through: 'Event_Participant' });

        // Sincroniza todos os modelos com o banco de dados.
        await sequelize.sync(); 
        console.log('Modelos sincronizados com o banco de dados.');

    } catch (error) {
        console.error('Erro ao sincronizar com o banco de dados:', error);
        return false;
    }
    return true;
}

export default syncer;