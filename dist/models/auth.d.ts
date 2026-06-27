import { Model } from "sequelize";
import type { AuthDTO } from "../schemas/auth.schema.js";
declare class Auth extends Model<AuthDTO> implements AuthDTO {
    id: string;
    nome: string;
    email: string;
    password: string;
    tipo: 'medico' | 'paciente';
    createdAt: Date;
    updatedAt: Date;
}
export default Auth;
//# sourceMappingURL=auth.d.ts.map