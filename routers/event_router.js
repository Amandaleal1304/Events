import { createEvent, listEvents, editEvent, saveEvent, deleteEvent} from "../controllers/event_controller.js";
import { Router } from "express";

const event_router = Router();

event_router.get('/', listEvents);

event_router.post('/create', createEvent);

event_router.post('/edit', editEvent);

event_router.post('/save', saveEvent);

event_router.post('/delete', deleteEvent);

export default event_router;