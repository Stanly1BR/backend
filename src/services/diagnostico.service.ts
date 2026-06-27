import diagnostico from '../models/diagnostico.js';
import type { DiagnosticoDTO } from '../schemas/diagnosticos.schema.js';

export class DiagnosticoService {
    async getDiagnosticoById(id: string): Promise<DiagnosticoDTO | null> {
        return diagnostico.findByPk(id) || null;
    }

    async getAllDiagnosticos(): Promise<DiagnosticoDTO[]> {
        return diagnostico.findAll();
    }

    async createDiagnostico(diagnosticoData: DiagnosticoDTO): Promise<DiagnosticoDTO> {
        const newDiagnostico = await diagnostico.create(diagnosticoData);
        return newDiagnostico;
    }

    async updateDiagnostico(id: string, diagnosticoData: Partial<DiagnosticoDTO>): Promise<DiagnosticoDTO | null> {
        const existingDiagnostico = await diagnostico.findByPk(id);

        if (!existingDiagnostico) {
            return null;
        }

        await existingDiagnostico.update(diagnosticoData);
        return existingDiagnostico;
    }

    async deleteDiagnostico(id: string): Promise<boolean> {
        const deletedCount = await diagnostico.destroy({ where: { id } });
        return deletedCount > 0;
    }
}