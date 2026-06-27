import { Model } from "sequelize";
import type { DiagnosticoDTO } from "../schemas/diagnosticos.schema.js";
export declare class Diagnostico extends Model<DiagnosticoDTO> implements DiagnosticoDTO {
    id: string;
    descricao: string;
    cid: string;
    pacienteId: string;
    consultaId: string;
    dataDiagnostico: Date;
    createdAt: Date;
    updatedAt: Date;
}
export default Diagnostico;
//# sourceMappingURL=diagnostico.d.ts.map