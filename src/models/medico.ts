import sequelize from "../db.js";
import { DataTypes, Model } from "sequelize";
import type { MedicoDTO } from "../schemas/medico.schema.js";

export class Medico extends Model<MedicoDTO> implements MedicoDTO {
    public declare id: string;
    public declare nome: string;
    public declare crm: string;
    public declare especialidade: string;
    public declare authId: string;
    public declare createdAt: Date;
    public declare updatedAt: Date;
}

Medico.init(
    {
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
        crm: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
            validate: {
                len: [1, 20],
                notEmpty: true,
            }
        },
        especialidade: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: [2, 100],
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
    },
    {
        sequelize,
        modelName: "Medico",
        tableName: "medicos",
        timestamps: true,
    }
);

export default Medico;
