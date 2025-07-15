import { createOrganizer, listOrganizers, editOrganizer, deleteOrganizer } from "../controllers/organizer_controller.js";
import { Router } from "express";

const organizer_router = Router();
organizer_router.get('/', listOrganizers);
organizer_router.post('/', createOrganizer);
organizer_router.put('/', editOrganizer);
organizer_router.delete('/', deleteOrganizer);

export default organizer_router;