import { createParticipant, listParticipants, editParticipant, saveParticipant, deleteParticipant } from "../controllers/participant_controller.js";
import { Router } from "express";

const participant_router = Router();
participant_router.get('/', listParticipants);
participant_router.post('/create', createParticipant);
participant_router.post('/edit', editParticipant);
participant_router.post('/save', saveParticipant);
participant_router.post('/delete', deleteParticipant);
export default participant_router;