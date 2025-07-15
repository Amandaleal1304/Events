import Organizer from "../models/organizer";
import Event from "../models/event";


async function createOrganizer(req, res) {

    const organizer = await Organizer.create({
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email
    });
    res.json(organizer);
}

async function listOrganizers(req, res) {
    const list = await Organizer.findAll({ include: Event });
    res.json(list);
}

async function editOrganizer(req, res) {

    const organizer = await Organizer.findOne({ where: { id: req.body.id } });
    organizer.name = req.body.name;
    organizer.contact = req.body.contact;
    organizer.email = req.body.email;
    await organizer.save();
    res.json({ mensage: 'Registro alterado' });

}

async function deleteOrganizer(req, res) {
    const organizer = await organizer.findOne({ where: { id: req.body.id } });
    await organizer.destroy();
    res.json({ mensage: 'Registro removido.' });
}

export { createOrganizer, listOrganizers, editOrganizer, deleteOrganizer };