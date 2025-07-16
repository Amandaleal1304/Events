import Organizer from "../models/organizer.js";
import Event from "../models/event.js";

async function createOrganizer(req, res) {
    try {
        await Organizer.create({
            name: req.body.name,
            contact: req.body.contact,
            email: req.body.email
        });
        res.render('alerts', { title: 'Organizadores', body: 'Organizador criado.' });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar organizador.", error: error.message });
    }
}


async function listOrganizers(req, res) {
    try {
        // Inclui o modelo Event para carregar eventos associados, se houver.
        const list = await Organizer.findAll({ include: Event });
        res.render('organizes/organize', { organizers: list, raw: true });
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar organizadores.", error: error.message });
    }
}


async function editOrganizer(req, res) {
    try {
        const organizer = await Organizer.findOne({ where: { id: req.body.id } });
        if (!organizer) {
            return res.status(404).json({ message: "Organizador não encontrado." });
        }
        res.render('organizes/organize', { action: 'edit', organizer_editing: organizer.dataValues });
    } catch (error) {
        res.status(500).json({ message: "Erro ao carregar dados para edição.", error: error.message });
    }
}


async function saveOrganizer(req, res) {
    try {
        const organizer = await Organizer.findOne({ where: { id: req.body.id } });
        organizer.name = req.body.name;
        organizer.contact = req.body.contact;
        organizer.email = req.body.email;
        await organizer.save();
        res.render('alerts', { title: 'Organizadores', body: 'Organizador editado.' });
    } catch (error) {
        res.status(500).json({ message: "Erro ao salvar o organizador.", error: error.message });
    }
}


async function deleteOrganizer(req, res) {
    try {
        const organizer = await Organizer.findOne({ where: { id: req.body.id } });
        await organizer.destroy();
        res.render('alerts', { title: 'Organizadores', body: 'Organizador deletado.' });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar o organizador.", error: error.message });
    }
}

export { createOrganizer, listOrganizers, editOrganizer, saveOrganizer, deleteOrganizer };