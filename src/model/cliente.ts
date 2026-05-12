import sequelize from "../db.js";
import { DataTypes } from "sequelize";
const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
    nome: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
    email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    },
    telefone: {
    type: DataTypes.STRING(20),
    allowNull: true,
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
  tableName: 'clientes',
  timestamps: true,
});

export default Cliente;