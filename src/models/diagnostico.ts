import sequelize from "../db.js";
import { DataTypes, Model } from "sequelize";
import type { DiagnosticoDTO } from "../schemas/diagnosticos.schema.js";

export class Diagnostico extends Model<DiagnosticoDTO> implements DiagnosticoDTO {
    public declare id: string;
    public declare descricao: string;
    public declare cid: string;
    public declare pacienteId: string;
    public declare consultaId: string;
    public declare dataDiagnostico: Date;
    public declare createdAt: Date;
    public declare updatedAt: Date;
}

Diagnostico.init(
    {
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
    },
    {
        sequelize,
        modelName: 'Diagnostico',
        tableName: 'diagnosticos',
        timestamps: true,
    }
);

export default Diagnostico;
