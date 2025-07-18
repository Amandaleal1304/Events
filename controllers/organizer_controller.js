import Organizer from "../models/organizer.js";
import Event from "../models/event.js";

async function createOrganizer(req, res) {
    try {
        await Organizer.create({
            name: req.body.name,
            contact: req.body.contact,
            email: req.body.email
        });
        // ALTERAÇÃO: Redireciona para a lista de organizadores.
        res.redirect('/organizers');
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar organizador.", error: error.message });
    }
}

async function listOrganizers(req, res) {
    try {
        // Busca a lista de organizadores e a processa para JSON.
        const organizersRaw = await Organizer.findAll();
        const organizers = organizersRaw.map(o => o.toJSON());
        res.render('organizes/organize', { organizers: organizers });
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar organizadores.", error: error.message });
    }
}

async function editOrganizer(req, res) {
    try {
        const organizer = await Organizer.findOne({ where: { id: req.body.id } });
        if (!organizer) {
            // ALTERAÇÃO: Redireciona se o organizador não for encontrado.
            return res.redirect('/organizers');
        }
        // Busca a lista completa para o caso da página ter um formulário de criação junto.
        const organizersRaw = await Organizer.findAll();
        const organizers = organizersRaw.map(o => o.toJSON());

        res.render('organizes/organize', { 
            action: 'edit', // CORREÇÃO: Adiciona o contexto para o formulário saber que está em modo de edição.
            organizers: organizers,
            organizer_editing: organizer.toJSON() 
        });
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
        // ALTERAÇÃO: Redireciona para a lista de organizadores.
        res.redirect('/organizers');
    } catch (error) {
        res.status(500).json({ message: "Erro ao salvar o organizador.", error: error.message });
    }
}

async function deleteOrganizer(req, res) {
    try {
        // Otimização: Destrói o registro diretamente sem busca prévia.
        await Organizer.destroy({ where: { id: req.body.id } });
        // ALTERAÇÃO: Redireciona para a lista de organizadores.
        res.redirect('/organizers');
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar o organizador.", error: error.message });
    }
}

export { createOrganizer, listOrganizers, editOrganizer, saveOrganizer, deleteOrganizer };
