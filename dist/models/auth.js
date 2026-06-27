import sequelize from "../db.js";
import { DataTypes, Model } from "sequelize";
class Auth extends Model {
}
Auth.init({
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
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true,
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: [6, 255],
            notEmpty: true,
        }
    },
    tipo: {
        type: DataTypes.ENUM('medico', 'paciente'),
        allowNull: false,
        validate: {
            isIn: [['medico', 'paciente']],
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
    modelName: 'Auth',
    tableName: 'auths',
    timestamps: true,
});
export default Auth;
//# sourceMappingURL=auth.js.map