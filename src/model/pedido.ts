import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Cliente from "./cliente.js";
import Produto from "./produto.js";

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clientes',
      key: 'id',
    },
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'Pendente',
  },
  geradoAutomaticamente: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'pedidos',
  timestamps: true,
});

// Tabela de associação Many-to-Many
const PedidoProduto = sequelize.define('PedidoProduto', {
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  precoUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'pedido_produtos',
  timestamps: false,
});

// Relacionamentos
Pedido.hasMany(PedidoProduto, { foreignKey: 'pedidoId', onDelete: 'CASCADE' });
PedidoProduto.belongsTo(Pedido, { foreignKey: 'pedidoId' });

PedidoProduto.belongsTo(Produto, { foreignKey: 'produtoId' });
Produto.hasMany(PedidoProduto, { foreignKey: 'produtoId' });

Pedido.belongsTo(Cliente, { foreignKey: 'clienteId' });
Cliente.hasMany(Pedido, { foreignKey: 'clienteId', onDelete: 'CASCADE' });

export default Pedido;
export { PedidoProduto };