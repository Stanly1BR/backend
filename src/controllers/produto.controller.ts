import { Router } from 'express';
import Produto from '../model/produto.js';

const router = Router();

// GET - Listar todos os produtos
router.get('/produtos', async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }
});

// GET - Buscar produto por ID
router.get('/produtos/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.json(produto);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar produto' });
  }
});

// POST - Criar novo produto
router.post('/produtos', async (req, res) => {
  try {
    const { nome, descricao, preco, estoque } = req.body;
    
    if (!nome || !preco) {
      return res.status(400).json({ erro: 'Nome e preço são obrigatórios' });
    }
    
    const produto = await Produto.create({
      nome,
      descricao,
      preco,
      estoque,
    });
    res.status(201).json(produto);
  } catch (error: any) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ erro: error.message || 'Erro ao criar produto' });
  }
});

// PUT - Atualizar produto
router.put('/produtos/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    await produto.update(req.body);
    res.json(produto);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar produto' });
  }
});

// DELETE - Deletar produto
router.delete('/produtos/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    await produto.destroy();
    res.json({ mensagem: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar produto' });
  }
});

export default router;