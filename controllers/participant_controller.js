import Participant from "../models/participant.js";
import Event from "../models/event.js";

async function createParticipant(req, res) {
    try {
        const participant = await Participant.create({
            name: req.body.name,
            age: req.body.age,
            telephone: req.body.telephone
        });
        res.status(201).json(participant);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar participante.", error: error.message });
    }
}

async function listParticipants(req, res) {
    try {
        const list = await Participant.findAll({ include: Event });
        res.json(list);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar participantes.", error: error.message });
    }
}

async function editParticipant(req, res) {
    try {
        const participant = await Participant.findOne({ where: { id: req.body.id } });

        if (!participant) {
            return res.status(404).json({ message: "Participante não encontrado." });
        }

        // Atualiza os campos
        participant.name = req.body.name;
        participant.age = req.body.age;
        participant.telephone = req.body.telephone;

        await participant.save();
        res.json({ message: "Registro de participante alterado com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao editar participante.", error: error.message });
    }
}

async function deleteParticipant(req, res) {
    try {
        const participant = await Participant.findOne({ where: { id: req.body.id } });

        if (!participant) {
            return res.status(404).json({ message: "Participante não encontrado." });
        }

        await participant.destroy();
        res.json({ message: "Registro de participante removido com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover participante.", error: error.message });
    }
}

export { createParticipant, listParticipants, editParticipant, deleteParticipant };