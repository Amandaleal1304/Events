import { createParticipant, listParticipants, editParticipant, deleteParticipant } from "../controllers/participant_controller.js";
import { Router } from "express";

const participant_router = Router();
participant_router.get('/', listParticipants);
participant_router.post('/', createParticipant);
participant_router.put('/', editParticipant);
participant_router.delete('/', deleteParticipant);

export default participant_router;