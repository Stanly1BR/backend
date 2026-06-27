import sequelize from "../db.js";
import { DataTypes, Model } from "sequelize";
export class Diagnostico extends Model {
}
Diagnostico.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    descricao: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: [5, 255],
            notEmpty: true,
        }
    },
    cid: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            len: [1, 10],
            notEmpty: true,
        }
    },
    pacienteId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'pacientes',
            key: 'id',
        },
        validate: {
            isUUID: 4,
            notEmpty: true,
        }
    },
    consultaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'consultas',
            key: 'id',
        },
        validate: {
            isUUID: 4,
            notEmpty: true,
        }
    },
    dataDiagnostico: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
            isDate: true,
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
    modelName: 'Diagnostico',
    tableName: 'diagnosticos',
    timestamps: true,
});
export default Diagnostico;
//# sourceMappingURL=diagnostico.js.map