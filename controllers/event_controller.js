import Event from "../models/event.js";

async function createEvent(req, res) {
    try {
        const event = await Event.create({
            name: req.body.name,
            date: req.body.date,
            local: req.body.local
        });
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar evento', details: error.message });
    }
}

async function listEvents(req, res) {
    try {
        const events = await Event.findAll();
        res.json(events);
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