import sequelize from "../db.js";
import { DataTypes, Model } from "sequelize";
import type { ConsultaDTO } from "../schemas/consulta.schema.js";

export class Consulta extends Model<ConsultaDTO> implements ConsultaDTO {
    public declare id: string;
    public declare pacienteId: string;
    public declare medicoId: string;
    public declare data: Date;
    public declare horario: string;
    public declare motivo: string;
    public declare status: 'agendada' | 'cancelada' | 'concluida';
    public declare createdAt: Date;
    public declare updatedAt: Date;
}

Consulta.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        pacienteId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "pacientes",
                key: "id",
            },
            validate: {
                isUUID: 4,
                notEmpty: true,
            }
        },
        medicoId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "medicos",
                key: "id",
            },
            validate: {
                isUUID: 4,
                notEmpty: true,
            }
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true,
                notEmpty: true,
            }
        },
        horario: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                len: [5, 10],
                notEmpty: true,
            }
        },
        motivo: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                len: [5, 255],
                notEmpty: true,
            }
        },
        status: {
            type: DataTypes.ENUM('agendada', 'cancelada', 'concluida'),
            defaultValue: 'agendada',
            validate: {
                isIn: [['agendada', 'cancelada', 'concluida']],
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
        modelName: "Consulta",
        tableName: "consultas",
        timestamps: true,
    }
);

export default Consulta;
