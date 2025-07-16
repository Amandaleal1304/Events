import { createCategory, listCategories, editCategory, saveCategory, deleteCategory } from "../controllers/category_controller.js";
import { Router } from "express";

const category_router = Router();
category_router.get('/', listCategories);
category_router.post('/create', createCategory);
category_router.post('/edit', editCategory);
category_router.post('/save', saveCategory);
category_router.post('/delete', deleteCategory);
export default category_router;
