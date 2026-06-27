import type { DiagnosticoDTO } from '../schemas/diagnosticos.schema.js';
export declare class DiagnosticoService {
    getDiagnosticoById(id: string): Promise<DiagnosticoDTO | null>;
    getAllDiagnosticos(): Promise<DiagnosticoDTO[]>;
    createDiagnostico(diagnosticoData: DiagnosticoDTO): Promise<DiagnosticoDTO>;
    updateDiagnostico(id: string, diagnosticoData: Partial<DiagnosticoDTO>): Promise<DiagnosticoDTO | null>;
    deleteDiagnostico(id: string): Promise<boolean>;
}
//# sourceMappingURL=diagnostico.service.d.ts.map