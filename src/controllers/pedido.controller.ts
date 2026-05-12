import { Router } from 'express';
import type { Request, Response } from 'express';
import Pedido from '../model/pedido.js';
import Cliente from '../model/cliente.js';
import Produto from '../model/produto.js';
import { PedidoProduto } from '../model/pedido.js';
import { Op } from 'sequelize';

const router = Router();

// GET - Listar todos os pedidos
router.get('/pedido', async (req: Request, res: Response) => {
  try {
    const pedidos = await Pedido.findAll({
      include: [
        {
          model: Cliente,
          attributes: ['id', 'nome', 'email'],
        },
        {
          model: PedidoProduto,
          include: [
            {
              model: Produto,
              attributes: ['id', 'nome', 'preco'],
            },
          ],
        },
      ],
    });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar pedidos' });
  }
});

// GET - Buscar pedido por ID
router.get('/pedido/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown;
    const pedidoId = parseInt(id as string, 10);
    if (!pedidoId || Number.isNaN(pedidoId)) {
      return res.status(400).json({ erro: 'ID de pedido inválido' });
    }
    const pedido = await Pedido.findByPk(pedidoId, {
      include: [
        {
          model: Cliente,
          attributes: ['id', 'nome', 'email'],
        },
        {
          model: PedidoProduto,
          include: [
            {
              model: Produto,
              attributes: ['id', 'nome', 'preco'],
            },
          ],
        },
      ],
    });

    if (!pedido) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }

    res.json(pedido);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar pedido' });
  }
});

// POST - Criar novo pedido
router.post('/pedido', async (req: Request, res: Response) => {
  try {
    const { clienteId, items } = req.body;

    if (!clienteId || !items || items.length === 0) {
      return res.status(400).json({ erro: 'clienteId e items são obrigatórios' });
    }

    // Verifica se cliente existe
    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    // Calcula total e valida produtos
    let total = 0;
    for (const item of items) {
      const produto = await Produto.findByPk(item.produtoId);
      if (!produto) {
        return res.status(404).json({ erro: `Produto ${item.produtoId} não encontrado` });
      }
      const precoUnitario = produto.get('preco') as number;
      total += precoUnitario * item.quantidade;
    }

    // Cria pedido
    const pedido = await Pedido.create({
      clienteId,
      total: parseFloat(total.toFixed(2)),
      status: 'Pendente',
      geradoAutomaticamente: false,
    });

    // Cria items do pedido
    for (const item of items) {
      const produto = await Produto.findByPk(item.produtoId);
      const precoUnitario = produto?.get('preco') as number || 0;
      await PedidoProduto.create({
        pedidoId: pedido.get('id') as number,
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        precoUnitario,
      });
    }

    // Verifica se deve gerar pedido automático (a partir do 2º pedido)
    const totalPedidosCliente = await Pedido.count({
      where: { clienteId },
    });

    if (totalPedidosCliente >= 2) {
      await gerarPedidoAutomatico(clienteId);
    }

    const pedidoCompleto = await Pedido.findByPk(pedido.get('id') as number, {
      include: [
        {
          model: PedidoProduto,
          include: [
            {
              model: Produto,
              attributes: ['id', 'nome', 'preco'],
            },
          ],
        },
      ],
    });

    res.status(201).json(pedidoCompleto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar pedido' });
  }
});

// PUT - Atualizar pedido
router.put('/pedido/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown;
    const pedidoId = parseInt(id as string, 10);
    if (!pedidoId || Number.isNaN(pedidoId)) {
      return res.status(400).json({ erro: 'ID de pedido inválido' });
    }
    const pedido = await Pedido.findByPk(pedidoId);
    if (!pedido) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }

    const { status, total } = req.body;
    if (status) pedido.set('status', status);
    if (total) pedido.set('total', total);

    await pedido.save();

    const pedidoAtualizado = await Pedido.findByPk(pedidoId, {
      include: [
        {
          model: PedidoProduto,
          include: [
            {
              model: Produto,
              attributes: ['id', 'nome', 'preco'],
            },
          ],
        },
      ],
    });

    res.json(pedidoAtualizado);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar pedido' });
  }
});

// DELETE - Deletar pedido
router.delete('/pedido/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown;
    const pedidoId = parseInt(id as string, 10);
    if (!pedidoId || Number.isNaN(pedidoId)) {
      return res.status(400).json({ erro: 'ID de pedido inválido' });
    }
    const pedido = await Pedido.findByPk(pedidoId);
    if (!pedido) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }
    await pedido.destroy();
    res.json({ mensagem: 'Pedido deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar pedido' });
  }
});

// GET - Relatório de pedidos por período
router.get('/relatorio/pedidos', async (req: Request, res: Response) => {
  try {
    const { dataInicio, dataFim, clienteId, status } = req.query;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let where: any = {};

    // Filtro por período
    if (dataInicio || dataFim) {
      where.createdAt = {};
      if (dataInicio) {
        where.createdAt[Op.gte] = new Date(dataInicio as string);
      }
      if (dataFim) {
        where.createdAt[Op.lte] = new Date(dataFim as string);
      }
    }

    // Filtro por cliente
    if (clienteId) {
      where.clienteId = clienteId;
    }

    // Filtro por status
    if (status) {
      where.status = status;
    }

    const pedidos = await Pedido.findAll({
      where,
      include: [
        {
          model: Cliente,
          attributes: ['id', 'nome', 'email'],
        },
        {
          model: PedidoProduto,
          include: [
            {
              model: Produto,
              attributes: ['id', 'nome', 'preco'],
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    // Calcula estatísticas
    const totalPedidos = pedidos.length;
    const valorTotal = pedidos.reduce((acc, pedido) => {
      const total = pedido.get('total') as number;
      return acc + total;
    }, 0);
    const pedidosConcluidos = pedidos.filter(p => p.get('status') === 'Concluído').length;
    const pedidosPendentes = pedidos.filter(p => p.get('status') === 'Pendente').length;
    const pedidosAutomaticos = pedidos.filter(p => p.get('geradoAutomaticamente')).length;

    res.json({
      filtros: {
        dataInicio: dataInicio || 'Não filtrado',
        dataFim: dataFim || 'Não filtrado',
        clienteId: clienteId || 'Todos',
        status: status || 'Todos',
      },
      estatisticas: {
        totalPedidos,
        valorTotal: parseFloat(valorTotal.toFixed(2)),
        pedidosConcluidos,
        pedidosPendentes,
        pedidosAutomaticos,
        valorMedio: totalPedidos > 0 ? parseFloat((valorTotal / totalPedidos).toFixed(2)) : 0,
      },
      pedidos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao gerar relatório' });
  }
});

// Função para gerar pedido automático (a partir do 2º pedido)
async function gerarPedidoAutomatico(clienteId: number) {
  try {
    // Busca o cliente
    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) return;

    // Busca todos os produtos disponíveis
    const produtos = await Produto.findAll({
      where: { estoque: { [Op.gt]: 0 } },
    });

    if (produtos.length === 0) return;

    // Escolhe 1-3 produtos aleatórios
    const numeroItens = Math.floor(Math.random() * 3) + 1;
    let total = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items: any[] = [];

    for (let i = 0; i < numeroItens; i++) {
      const produto = produtos[Math.floor(Math.random() * produtos.length)];
      if (!produto) continue;
      
      const quantidade = Math.floor(Math.random() * 2) + 1;
      const preco = produto.get('preco') as number;
      total += preco * quantidade;

      items.push({
        produtoId: produto.get('id') as number,
        quantidade,
        preco,
      });
    }

    // Cria pedido automático
    const pedidoAuto = await Pedido.create({
      clienteId,
      total: parseFloat(total.toFixed(2)),
      status: 'Pendente',
      geradoAutomaticamente: true,
    });

    // Adiciona items ao pedido
    for (const item of items) {
      await PedidoProduto.create({
        pedidoId: pedidoAuto.get('id') as number,
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        precoUnitario: item.preco,
      });
    }

    console.log(`✅ Pedido automático gerado para cliente ${clienteId}`);
  } catch (error) {
    console.error('Erro ao gerar pedido automático:', error);
  }
}

export default router;
