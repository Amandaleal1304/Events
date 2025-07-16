import { createOrganizer, listOrganizers, editOrganizer, saveOrganizer, deleteOrganizer } from "../controllers/organizer_controller.js";
import { Router } from "express";

const organizer_router = Router();
organizer_router.get('/', listOrganizers);
organizer_router.post('/create', createOrganizer);
organizer_router.post('/edit', editOrganizer);
organizer_router.post('/save', saveOrganizer);
organizer_router.post('/delete', deleteOrganizer);

export default organizer_router;