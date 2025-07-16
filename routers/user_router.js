import { Router } from "express";
import { promptUser, createUser, login, logout, promptLogin } from "../controllers/user_controller.js";

const user_web_router = Router();
user_web_router.get('/register', promptUser);
user_web_router.post('/register', createUser);
user_web_router.get('/login', promptLogin);
user_web_router.post('/login', login);
user_web_router.get('/logout', logout);

export default user_web_router;