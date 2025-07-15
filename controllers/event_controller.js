import Event from "../models/event.js";
import Organizer from "../models/organizer.js";
import Category from "../models/category.js";
import Participant from "../models/participant.js";


async function createEvent(req, res) {
    try {
    const participants = [];
    for (let i = 0; i < req.body.participants.length; i++) {
        const participant = await Participant.findByPk(req.body.participants[i]);
        participants.push(participant);
    }

    
        const event = await Event.create({
            name: req.body.name,
            date: req.body.date,
            local: req.body.local,
            OrganizerId: req.body.OrganizerId,
            CategoryId: req.body.CategoryId
        });
        await event.addParticipants(participants);
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar evento', details: error.message });
    }
}

async function listEvents(req, res) {
    try {
        const list = await Event.findAll({include: [Organizer, Category, Participant]});
        res.json(list);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar eventos', details: error.message });
    }
}

async function editEvent(req, res) {
    try {
        const event = await Event.findOne({ where: { id: req.body.id } });
        if (!event) {
            return res.status(404).json({ message: 'Evento não encontrado.' });
        }
        event.name = req.body.name;
        event.date = req.body.date;
        event.local = req.body.local;
        await event.save();
        res.json({ message: 'Registro alterado' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao editar evento', details: error.message });
    }
}

async function deleteEvent(req, res) {
    try {
        const event = await Event.findOne({ where: { id: req.body.id } });
        if (!event) {
            return res.status(404).json({ message: 'Evento não encontrado.' });
        }
        await event.destroy();
        res.json({ message: 'Registro removido.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover evento', details: error.message });
    }
}

export { createEvent, listEvents, editEvent, deleteEvent };