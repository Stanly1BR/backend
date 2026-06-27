import type { ConsultaDTO } from "../schemas/consulta.schema.js";
export declare class ConsultaService {
    getConsultaById(id: string): Promise<ConsultaDTO | null>;
    getAllConsultas(): Promise<ConsultaDTO[]>;
    createConsulta(consultaData: ConsultaDTO): Promise<ConsultaDTO>;
    updateConsulta(id: string, consultaData: Partial<ConsultaDTO>): Promise<ConsultaDTO | null>;
    deleteConsulta(id: string): Promise<boolean>;
}
//# sourceMappingURL=consulta.service.d.ts.map