import Category from "../models/category.js";
import Event from "../models/event.js";

async function createCategory(req, res) {
    try {
        const category = await Category.create({
            name: req.body.name,
            description: req.body.description,
        });
        res.json(category);
    }
        catch (error) {
        res.status(500).json({ error: 'Erro ao criar categoria', details: error.message });
    }

}

async function listCategories(req, res) {
    try {
        const list = await Category.findAll({ include: Event });
        res.json(list);
    }  catch (error) {
        res.status(500).json({ error: 'Erro ao listar categoria', details: error.message });
    }
}

async function editCategory(req, res) {
    try {
        const category = await Category.findOne({ where: { id: req.body.id } });
        if (!category) {
            return res.status(404).json({ message: "Categoria não encontrada." });
        }
        category.name = req.body.name;
        category.description = req.body.description;
        await category.save();
        res.json({ message: "Registro alterado com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao editar categoria.", error: error.message });
    }
}

async function deleteCategory(req, res) {
    try {
        
        const category = await Category.findOne({ where: { id: req.body.id } });
        if (!category) {
            return res.status(404).json({ message: "Categoria não encontrada." });
        }
        await category.destroy();
        res.json({ message: "Registro removido com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover categoria.", error: error.message });
    }
}

export { createCategory, listCategories, editCategory, deleteCategory };