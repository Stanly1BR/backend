import { Model } from "sequelize";
import type { ConsultaDTO } from "../schemas/consulta.schema.js";
export declare class Consulta extends Model<ConsultaDTO> implements ConsultaDTO {
    id: string;
    pacienteId: string;
    medicoId: string;
    data: Date;
    horario: string;
    motivo: string;
    status: 'agendada' | 'cancelada' | 'concluida';
    createdAt: Date;
    updatedAt: Date;
}
export default Consulta;
//# sourceMappingURL=consulta.d.ts.map