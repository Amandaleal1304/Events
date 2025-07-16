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
            city: req.body.city,
            OrganizerId: req.body.OrganizerId,
            CategoryId: req.body.CategoryId
        });
        await event.addParticipants(participants);
        res.render('alerts', { title: 'Events', body: 'Event created.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar evento', details: error.message });
    }
}

async function listEvents(req, res) {
    try {
        const list = await Event.findAll({ include: [Organizer, Category, Participant], raw: true });
        res.render('events/events', { events: list,  });
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
        event.city = req.body.city;
        await event.save();
        res.render('events/events', { action: 'edit', event_editing: event.dataValues });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao editar evento', details: error.message });
    }
}


async function saveEvent(req, res) {
    try {
        const event = await Event.findOne({ where: { id: req.body.id } });
        // Verifica se o evento realmente existe
        if (!event) {
            return res.status(404).render('alerts', { title: 'Erro', body: 'Evento não encontrado.' });
        }
        event.name = req.body.name;
        event.date = req.body.date;
        event.city = req.body.city;
        // event.DirectorId = req.body.DirectorId;

        // 3. Atualiza os relacionamentos "um-para-muitos".
        event.OrganizerId = req.body.OrganizerId;
        event.CategoryId = req.body.CategoryId;

        // 4. Atualiza o relacionamento "muitos-para-muitos" com Participantes.
        if (req.body.participants && Array.isArray(req.body.participants)) {
            await event.setParticipants(req.body.participants);
        } else {
            // Se nenhuma lista for enviada, remove todos os participantes associados.
            await event.setParticipants([]);
        }
        await event.save();
        res.render('alerts', { title: 'Events', body: 'Event saved.' });
    } catch (error) {
        // Em caso de erro, retorna uma resposta com status 500.
        res.status(500).json({ error: 'Erro ao salvar o evento', details: error.message });
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

export { createEvent, listEvents, editEvent, saveEvent, deleteEvent };