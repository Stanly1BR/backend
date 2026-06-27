import paciente from "../models/paciente.js";
export class PacienteService {
    async getPacienteById(id) {
        return paciente.findByPk(id) || null;
    }
    async getAllPacientes() {
        return paciente.findAll();
    }
    async createPaciente(pacienteData) {
        const newPaciente = await paciente.create(pacienteData);
        return newPaciente;
    }
    async updatePaciente(id, pacienteData) {
        const existingPaciente = await paciente.findByPk(id);
        if (!existingPaciente) {
            return null;
        }
        await existingPaciente.update(pacienteData);
        return existingPaciente;
    }
    async deletePaciente(id) {
        const deletedCount = await paciente.destroy({ where: { id } });
        return deletedCount > 0;
    }
}
//# sourceMappingURL=paciente.service.js.map