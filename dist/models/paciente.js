import sequelize from '../db.js';
import { DataTypes, Model } from 'sequelize';
export class Paciente extends Model {
}
Paciente.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [2, 100],
            notEmpty: true,
        }
    },
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
        validate: {
            len: [11, 11],
            isNumeric: true,
            notEmpty: true,
        }
    },
    dataNascimento: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
            notEmpty: true,
        }
    },
    telefone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            len: [10, 20],
            notEmpty: true,
        }
    },
    authId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "auths",
            key: "id",
        },
        validate: {
            isUUID: 4,
            notEmpty: true,
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: "Paciente",
    tableName: "pacientes",
    timestamps: true,
});
export default Paciente;
//# sourceMappingURL=paciente.js.map