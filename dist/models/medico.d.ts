import { Model } from "sequelize";
import type { MedicoDTO } from "../schemas/medico.schema.js";
export declare class Medico extends Model<MedicoDTO> implements MedicoDTO {
    id: string;
    nome: string;
    crm: string;
    especialidade: string;
    authId: string;
    createdAt: Date;
    updatedAt: Date;
}
export default Medico;
//# sourceMappingURL=medico.d.ts.map