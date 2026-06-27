import { Model } from 'sequelize';
import type { PacienteDTO } from '../schemas/paciente.schema.js';
export declare class Paciente extends Model<PacienteDTO> implements PacienteDTO {
    id: string;
    nome: string;
    cpf: string;
    dataNascimento: Date;
    telefone: string;
    authId: string;
    createdAt: Date;
    updatedAt: Date;
}
export default Paciente;
//# sourceMappingURL=paciente.d.ts.map