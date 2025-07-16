import { raw } from "mysql2";
import Category from "../models/category.js";
import Event from "../models/event.js";

async function createCategory(req, res) {
    try {
        await Category.create({
            name: req.body.name,
            description: req.body.description,
        });
        res.render('alerts', { title: 'Categorias', body: 'Categoria criada com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar categoria', details: error.message });
    }
}

async function listCategories(req, res) {
    try {
        const list = await Category.findAll({ include: Event ,raw: true });
        res.render('categories/category', { categories: list });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar categorias', details: error.message });
    }
}

async function editCategory(req, res) {
    try {
        const category = await Category.findOne({ where: { id: req.body.id } });
        res.render('categories/category', { action: 'edit', category_editing: category.dataValues });
    } catch (error) {
        // Tratamento de erro adicionado
        res.status(500).json({ message: "Erro ao carregar dados para edição.", error: error.message });
    }
}

async function saveCategory(req, res) {
    try {
        const category = await Category.findOne({ where: { id: req.body.id } });
        category.name = req.body.name;
        category.description = req.body.description;
        await category.save();
        res.render('alerts', { title: 'Categories', body: 'Category editada.' });
    } catch (error) {
        // Tratamento de erro adicionado
        res.status(500).json({ message: "Erro ao salvar a category.", error: error.message });
    }
}

async function deleteCategory(req, res) {
    try {
        const category = await Category.findOne({ where: { id: req.body.id } });
        if (!category) {
            return res.status(404).json({ message: "Categoria não encontrada." });
        }
        await category.destroy();
        res.json({ message: "Registro removido." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover categoria.", error: error.message });
    }
}

// Exporta as funções, mantendo a estrutura original do seu arquivo.
export { createCategory, listCategories, editCategory, saveCategory, deleteCategory };