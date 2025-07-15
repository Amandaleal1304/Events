import { createCategory, listCategories, editCategory, deleteCategory } from "../controllers/category_controller.js";
import { Router } from "express";

const category_router = Router();
category_router.get('/', listCategories);
category_router.post('/', createCategory);
category_router.put('/', editCategory);
category_router.delete('/', deleteCategory);

export default category_router;