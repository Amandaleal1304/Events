import Participant from "../models/participant.js";
import Event from "../models/event.js"; 

async function createParticipant(req, res) {
    try {
        await Participant.create({
            name: req.body.name,
            age: req.body.age,
            telephone: req.body.telephone
        });
        res.render('alerts', { title: 'Participantes', body: 'Participante criado.' });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar participante.", error: error.message });
    }
}


async function listParticipants(req, res) {
    try {
        const list = await Participant.findAll({ include: Event });
        res.render('participants/participant', { participants: list, raw: true });
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar participantes.", error: error.message });
    }
}


async function editParticipant(req, res) {
    try {
        const participant = await Participant.findOne({ where: { id: req.body.id } });
        res.render('participants/participant', { action: 'edit', participant_editing: participant.dataValues });
    } catch (error) {
        res.status(500).json({ message: "Erro ao carregar dados para edição.", error: error.message });
    }
}


async function saveParticipant(req, res) {
    try {
        const participant = await Participant.findOne({ where: { id: req.body.id } });
        participant.name = req.body.name;
        participant.age = req.body.age;
        participant.telephone = req.body.telephone;
        await participant.save();
        res.render('alerts', { title: 'Participantes', body: 'Participante editado.' });
    } catch (error) {
        res.status(500).json({ message: "Erro ao salvar o participante.", error: error.message });
    }
}


async function deleteParticipant(req, res) {
    try {
        const participant = await Participant.findOne({ where: { id: req.body.id } });
        await participant.destroy();
        res.render('alerts', { title: 'Participantes', body: 'Participante deletado.' });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar o participante.", error: error.message });
    }
}

export { createParticipant, listParticipants, editParticipant, saveParticipant, deleteParticipant };