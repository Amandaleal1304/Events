import Participant from "../models/participant.js";
import Event from "../models/event.js"; 

async function createParticipant(req, res) {
    try {
        await Participant.create({
            name: req.body.name,
            age: req.body.age,
            telephone: req.body.telephone
        });
        // ALTERAÇÃO: Redireciona para a lista de participantes.
        res.redirect('/participants');
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar participante.", error: error.message });
    }
}

async function listParticipants(req, res) {
    try {
        // Busca a lista de participantes e a processa para JSON.
        const participantsRaw = await Participant.findAll();
        const participants = participantsRaw.map(p => p.toJSON());
        res.render('participants/participant', { participants: participants });
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar participantes.", error: error.message });
    }
}

async function editParticipant(req, res) {
    try {
        const participant = await Participant.findOne({ where: { id: req.body.id } });
        if (!participant) {
            // ALTERAÇÃO: Redireciona se o participante não for encontrado.
            return res.redirect('/participants');
        }
        
        // Busca a lista completa para exibir na página junto com o formulário de edição.
        const participantsRaw = await Participant.findAll();
        const participants = participantsRaw.map(p => p.toJSON());

        res.render('participants/participant', { 
            action: 'edit', // Adiciona o contexto para o formulário saber que está em modo de edição.
            participants: participants,
            participant_editing: participant.toJSON()
        });
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
        // ALTERAÇÃO: Redireciona para a lista de participantes.
        res.redirect('/participants');
    } catch (error) {
        res.status(500).json({ message: "Erro ao salvar o participante.", error: error.message });
    }
}

async function deleteParticipant(req, res) {
    try {
        // Otimização: Destrói o registro diretamente sem busca prévia.
        await Participant.destroy({ where: { id: req.body.id } });
        // ALTERAÇÃO: Redireciona para a lista de participantes.
        res.redirect('/participants');
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar o participante.", error: error.message });
    }
}

export { createParticipant, listParticipants, editParticipant, saveParticipant, deleteParticipant };
