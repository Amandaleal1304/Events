import { createEvent, listEvents, editEvent, deleteEvent } from "../controllers/event_controller.js";
import { Router } from "express";

const event_router = Router();

event_router.get('/', listEvents);

event_router.post('/', createEvent);

event_router.put('/', editEvent);

event_router.delete('/', deleteEvent);

export default event_router;