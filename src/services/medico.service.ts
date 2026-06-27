import medico from '../models/medico.js';
import type { MedicoDTO } from '../schemas/medico.schema.js';

export class MedicoService {
    async getMedicoById(id: string): Promise<MedicoDTO | null> {
        return medico.findByPk(id) || null;
    }

    async getAllMedicos(): Promise<MedicoDTO[]> {
        return medico.findAll();
    }

    async createMedico(medicoData: MedicoDTO): Promise<MedicoDTO> {
        const newMedico = await medico.create(medicoData);
        return newMedico;
    }

    async updateMedico(id: string, medicoData: Partial<MedicoDTO>): Promise<MedicoDTO | null> {
        const existingMedico = await medico.findByPk(id);
        if (!existingMedico) {
            return null;
        }

        await existingMedico.update(medicoData);
        return existingMedico;
    }

    async deleteMedico(id: string): Promise<boolean> {
        const deletedCount = await medico.destroy({ where: { id } });
        return deletedCount > 0;
    }
}