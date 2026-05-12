# Sistema de Controle de Pedidos

## 📋 Descrição

Sistema completo de controle de pedidos com geração automática de dados e relatórios.

## ✨ Funcionalidades Implementadas

### 1️⃣ Cadastro Automático de Produtos
- 8 produtos pré-cadastrados com diferentes categorias (notebooks, periféricos, etc.)
- Cada produto possui: nome, descrição, preço e quantidade em estoque
- Dados são gerados automaticamente via script de seed

### 2️⃣ Cadastro Automático de Clientes
- 6 clientes pré-cadastrados com nome, email e telefone
- Dados são gerados automaticamente via script de seed
- Cada cliente recebe múltiplos pedidos

### 3️⃣ Geração Automática de Pedidos
- Primeiro pedido: gerado manualmente pelo usuário
- A partir do 2º pedido: gerados automaticamente com:
  - Produtos aleatórios do catálogo
  - Quantidades variadas
  - Status aleatório (Pendente/Concluído)
  - Campo `geradoAutomaticamente` marca os pedidos automáticos

### 4️⃣ Relatório de Pedidos por Período
- Filtros: data inicial, data final, cliente, status
- Estatísticas calculadas:
  - Total de pedidos
  - Valor total faturado
  - Quantidade de pedidos concluídos
  - Quantidade de pedidos pendentes
  - Quantidade de pedidos gerados automaticamente
  - Valor médio por pedido

## 🚀 Como Usar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Gerar Dados Automaticamente (Seed)
```bash
npm run seed
```
Este comando:
- Cria todas as tabelas no banco de dados
- Popula 8 produtos
- Popula 6 clientes
- Gera 2-4 pedidos por cliente (1º manual, posteriores automáticos)

### 3. Iniciar o Servidor
```bash
npm run dev
```

### 4. Usar os Endpoints

#### **Produtos**
- `GET /produtos` - Listar todos os produtos
- `GET /produtos/:id` - Buscar produto por ID
- `POST /produtos` - Criar novo produto
- `PUT /produtos/:id` - Atualizar produto
- `DELETE /produtos/:id` - Deletar produto

#### **Clientes**
- `GET /cliente` - Listar todos os clientes
- `GET /cliente/:id` - Buscar cliente por ID
- `POST /cliente` - Criar novo cliente
- `PUT /cliente/:id` - Atualizar cliente
- `DELETE /cliente/:id` - Deletar cliente

#### **Pedidos**
- `GET /pedido` - Listar todos os pedidos com detalhes
- `GET /pedido/:id` - Buscar pedido específico com produtos
- `POST /pedido` - Criar novo pedido
- `PUT /pedido/:id` - Atualizar status/total do pedido
- `DELETE /pedido/:id` - Deletar pedido

#### **Relatório de Pedidos** ⭐
```
GET /relatorio/pedidos
```

**Filtros (query parameters) - todos opcionais:**
- `dataInicio` - Data inicial (YYYY-MM-DD)
- `dataFim` - Data final (YYYY-MM-DD)
- `clienteId` - ID do cliente
- `status` - Status do pedido (Pendente/Concluído)

**Exemplos:**
```
GET /relatorio/pedidos
GET /relatorio/pedidos?dataInicio=2024-01-01&dataFim=2024-12-31
GET /relatorio/pedidos?clienteId=1
GET /relatorio/pedidos?status=Concluído
GET /relatorio/pedidos?dataInicio=2024-01-01&clienteId=1&status=Concluído
```

**Resposta do Relatório:**
```json
{
  "filtros": {
    "dataInicio": "2024-01-01",
    "dataFim": "2024-12-31",
    "clienteId": "Todos",
    "status": "Todos"
  },
  "estatisticas": {
    "totalPedidos": 15,
    "valorTotal": 25000.50,
    "pedidosConcluidos": 12,
    "pedidosPendentes": 3,
    "pedidosAutomaticos": 10,
    "valorMedio": 1666.70
  },
  "pedidos": [
    {
      "id": 1,
      "clienteId": 1,
      "total": 1500.00,
      "status": "Concluído",
      "geradoAutomaticamente": false,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "Cliente": {
        "id": 1,
        "nome": "João Silva",
        "email": "joao@example.com"
      },
      "PedidoProdutos": [
        {
          "quantidade": 1,
          "precoUnitario": 1500.00,
          "Produto": {
            "id": 1,
            "nome": "Notebook Dell",
            "preco": 1500.00
          }
        }
      ]
    }
  ]
}
```

## 📊 Estrutura do Banco de Dados

### Tabelas
- **clientes** - Armazena informações dos clientes
- **produtos** - Armazena catálogo de produtos
- **pedidos** - Armazena pedidos com campo `geradoAutomaticamente`
- **pedido_produtos** - Tabela associativa (Many-to-Many) com quantidade e preço unitário

## 🔄 Fluxo de Geração de Pedidos Automáticos

1. **Usuário cria 1º pedido manualmente** → `geradoAutomaticamente = false`
2. **Sistema detecta 2º pedido** → Gera automaticamente um novo pedido
3. **A partir do 2º em diante** → Todos os novos pedidos são automáticos
4. **Cada pedido automático inclui:**
   - 1-3 produtos aleatórios do catálogo
   - Quantidades aleatórias (1-2 unidades)
   - Status aleatório (Pendente/Concluído)

## 💡 Exemplos de Uso

### Criar um Pedido
```bash
curl -X POST http://localhost:3000/pedido \
  -H "Content-Type: application/json" \
  -d '{
    "clienteId": 1,
    "items": [
      {"produtoId": 1, "quantidade": 1},
      {"produtoId": 2, "quantidade": 2}
    ]
  }'
```

### Gerar Relatório com Filtros
```bash
curl "http://localhost:3000/relatorio/pedidos?dataInicio=2024-01-01&dataFim=2024-12-31&clienteId=1"
```

## 📝 Notas Importantes

- O seed sobrescreve todos os dados existentes (útil para resetar o banco)
- Pedidos automáticos só são criados quando o cliente tem 2 ou mais pedidos
- O campo `geradoAutomaticamente` ajuda a rastrear quais pedidos foram criados automaticamente
- Relatórios podem ser filtrados por múltiplos critérios simultaneamente

## 🔧 Tecnologias Utilizadas

- **Express.js** - Framework web
- **TypeScript** - Linguagem tipada
- **Sequelize** - ORM para banco de dados
- **SQLite** - Banco de dados local
- **Zod** - Validação de dados

---

**Desenvolvido com ❤️ para o Sistema de Controle de Pedidos**
