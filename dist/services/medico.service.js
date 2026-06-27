import medico from '../models/medico.js';
export class MedicoService {
    async getMedicoById(id) {
        return medico.findByPk(id) || null;
    }
    async getAllMedicos() {
        return medico.findAll();
    }
    async createMedico(medicoData) {
        const newMedico = await medico.create(medicoData);
        return newMedico;
    }
    async updateMedico(id, medicoData) {
        const existingMedico = await medico.findByPk(id);
        if (!existingMedico) {
            return null;
        }
        await existingMedico.update(medicoData);
        return existingMedico;
    }
    async deleteMedico(id) {
        const deletedCount = await medico.destroy({ where: { id } });
        return deletedCount > 0;
    }
}
//# sourceMappingURL=medico.service.js.map