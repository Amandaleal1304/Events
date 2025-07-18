import Category from "../models/category.js";
import Event from "../models/event.js";

async function createCategory(req, res) {
    try {
        await Category.create({
            name: req.body.name,
            description: req.body.description,
        });
        // ALTERAÇÃO: Redireciona para a lista de categorias.
        res.redirect('/categories');
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar categoria', details: error.message });
    }
}

async function listCategories(req, res) {
    try {
        // Busca a lista de categorias e a processa para JSON.
        const categoriesRaw = await Category.findAll();
        const categories = categoriesRaw.map(c => c.toJSON());
        res.render('categories/category', { categories: categories });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar categorias', details: error.message });
    }
}

async function editCategory(req, res) {
    try {
        const category = await Category.findOne({ where: { id: req.body.id } });
        if (!category) {
            // ALTERAÇÃO: Redireciona se a categoria não for encontrada.
            return res.redirect('/categories');
        }

        // Busca a lista completa para exibir na página junto com o formulário de edição.
        const categoriesRaw = await Category.findAll();
        const categories = categoriesRaw.map(c => c.toJSON());
        
        res.render('categories/category', { 
            action: 'edit', // Adiciona o contexto para o formulário saber que está em modo de edição.
            categories: categories,
            category_editing: category.toJSON() 
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao carregar dados para edição.", error: error.message });
    }
}

async function saveCategory(req, res) {
    try {
        const category = await Category.findOne({ where: { id: req.body.id } });
        category.name = req.body.name;
        category.description = req.body.description;
        await category.save();
        // ALTERAÇÃO: Redireciona para a lista de categorias.
        res.redirect('/categories');
    } catch (error) {
        res.status(500).json({ message: "Erro ao salvar a categoria.", error: error.message });
    }
}

async function deleteCategory(req, res) {
    try {
        // Otimização: Destrói o registro diretamente sem busca prévia.
        await Category.destroy({ where: { id: req.body.id } });
        // ALTERAÇÃO: Redireciona para a lista de categorias.
        res.redirect('/categories');
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover categoria.", error: error.message });
    }
}

export { createCategory, listCategories, editCategory, saveCategory, deleteCategory };
