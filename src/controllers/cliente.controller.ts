import { Router } from 'express';
import Cliente from '../model/cliente.js';

const router = Router();

router.get('/cliente', async (req, res) => {
    try {
        const cliente = await Cliente.findAll();
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar cliente' });
    }
});

router.get('/cliente/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (!cliente) {
            return res.status(404).json({ erro: 'Cliente não encontrado' });
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar cliente' });
    }
});


router.post('/cliente', async (req, res) => {
    try {
        const { nome, email, telefone } = req.body;
        
        if (!nome || !email) {
            return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
        }
        
        const cliente = await Cliente.create({
            nome,
            email,
            telefone,
        });
        res.status(201).json(cliente);
    } catch (error: any) {
        console.error('Erro ao criar cliente:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ erro: 'Email já cadastrado' });
        }
        res.status(500).json({ erro: error.message || 'Erro ao criar cliente' });
    }
});

router.put('/cliente/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (!cliente) {
            return res.status(404).json({ erro: 'Cliente não encontrado' });
        }
        await cliente.update(req.body);
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar cliente' });
    }
});

router.delete('/cliente/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (!cliente) {
            return res.status(404).json({ erro: 'Cliente não encontrado' });
        }
        await cliente.destroy();
        res.json({ mensagem: 'Cliente deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao deletar cliente' });
    }
});

export default router;