import diagnostico from '../models/diagnostico.js';
export class DiagnosticoService {
    async getDiagnosticoById(id) {
        return diagnostico.findByPk(id) || null;
    }
    async getAllDiagnosticos() {
        return diagnostico.findAll();
    }
    async createDiagnostico(diagnosticoData) {
        const newDiagnostico = await diagnostico.create(diagnosticoData);
        return newDiagnostico;
    }
    async updateDiagnostico(id, diagnosticoData) {
        const existingDiagnostico = await diagnostico.findByPk(id);
        if (!existingDiagnostico) {
            return null;
        }
        await existingDiagnostico.update(diagnosticoData);
        return existingDiagnostico;
    }
    async deleteDiagnostico(id) {
        const deletedCount = await diagnostico.destroy({ where: { id } });
        return deletedCount > 0;
    }
}
//# sourceMappingURL=diagnostico.service.js.map