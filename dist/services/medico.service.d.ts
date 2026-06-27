import type { MedicoDTO } from '../schemas/medico.schema.js';
export declare class MedicoService {
    getMedicoById(id: string): Promise<MedicoDTO | null>;
    getAllMedicos(): Promise<MedicoDTO[]>;
    createMedico(medicoData: MedicoDTO): Promise<MedicoDTO>;
    updateMedico(id: string, medicoData: Partial<MedicoDTO>): Promise<MedicoDTO | null>;
    deleteMedico(id: string): Promise<boolean>;
}
//# sourceMappingURL=medico.service.d.ts.map