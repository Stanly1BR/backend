import type { PacienteDTO } from "../schemas/paciente.schema.js";
export declare class PacienteService {
    getPacienteById(id: string): Promise<PacienteDTO | null>;
    getAllPacientes(): Promise<PacienteDTO[]>;
    createPaciente(pacienteData: PacienteDTO): Promise<PacienteDTO>;
    updatePaciente(id: string, pacienteData: Partial<PacienteDTO>): Promise<PacienteDTO | null>;
    deletePaciente(id: string): Promise<boolean>;
}
//# sourceMappingURL=paciente.service.d.ts.map