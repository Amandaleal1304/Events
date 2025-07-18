import Event from "../models/event.js";
import Organizer from "../models/organizer.js";
import Category from "../models/category.js";
import Participant from "../models/participant.js";

async function createEvent(req, res) {
    try {
        const event = await Event.create({
            name: req.body.name,
            date: req.body.date,
            city: req.body.city,
            OrganizerId: req.body.OrganizerId,
            CategoryId: req.body.CategoryId
        });

        if (req.body.participants && req.body.participants.length > 0) {
            await event.setParticipants(req.body.participants);
        }

        // ALTERAÇÃO: Redireciona para a lista de eventos.
        res.redirect('/events');

    } catch (error) {
        console.error("ERRO AO CRIAR EVENTO:", error); 
        res.status(500).json({ error: 'Erro ao criar evento', details: error.message });
    }
}

// Em event_controller.js

async function listEvents(req, res) {
    try {
        // 1. Busca todos os eventos, incluindo seus relacionamentos (SEM raw:true).
        const events = await Event.findAll({ 
            include: [Organizer, Category, Participant]
        });
        
        // 2. Processa a lista para converter em objetos JSON puros.
        //    Isso preserva corretamente os relacionamentos aninhados.
        const processedEvents = events.map(event => event.toJSON());

        // 3. Busca as listas completas para preencher os formulários na view.
        const organizersList = await Organizer.findAll({ raw: true });
        const categoriesList = await Category.findAll({ raw: true });
        const participantsList = await Participant.findAll({ raw: true });

        // 4. Renderiza a view com os dados corretos.
        res.render('events/events', { 
            events: processedEvents, 
            all_organizers: organizersList,
            all_categories: categoriesList,
            all_participants: participantsList
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao carregar a página de eventos', details: error.message });
    }
}

async function editEvent(req, res) {
    try {
        const event = await Event.findOne({ 
            where: { id: req.body.id }, 
            include: [Organizer, Category, Participant] 
        });

        if (!event) {
            // ALTERAÇÃO: Redireciona em caso de erro.
            return res.redirect('/events');
        }

        const event_editing = event.toJSON();
        
        if (event_editing.date) {
            const dateObj = new Date(event_editing.date);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            event_editing.date = `${year}-${month}-${day}`;
        }

        const all_organizers = await Organizer.findAll({ raw: true });
        const all_categories = await Category.findAll({ raw: true });
        const all_participants = await Participant.findAll({ raw: true });

        event_editing.Participants = event_editing.Participants.map(participant => participant.id);

        res.render('events/events', {
            action: 'edit',
            event_editing: event_editing,
            all_organizers: all_organizers,
            all_categories: all_categories,
            all_participants: all_participants
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao carregar página de edição de evento', details: error.message });
    }
}

async function saveEvent(req, res) {
    try {
        const event = await Event.findOne({ where: { id: req.body.id } });

        event.name = req.body.name;
        event.date = req.body.date;
        event.city = req.body.city;
        event.OrganizerId = req.body.OrganizerId;
        event.CategoryId = req.body.CategoryId;
        
        await event.save();

        if (req.body.participants) {
            await event.setParticipants(req.body.participants);
        } else {
            await event.setParticipants([]);
        }

        // ALTERAÇÃO: Redireciona para a lista de eventos.
        res.redirect('/events');

    } catch (error) {
        res.status(500).json({ error: 'Erro ao salvar o evento', details: error.message });
    }
}

async function deleteEvent(req, res) {
    try {
        await Event.destroy({ where: { id: req.body.id } });
        
        // ALTERAÇÃO: Redireciona para a lista de eventos.
        res.redirect('/events');

    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover evento', details: error.message });
    }
}

export { createEvent, listEvents, editEvent, saveEvent, deleteEvent };