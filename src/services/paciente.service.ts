import paciente from "../models/paciente.js";
import type { PacienteDTO } from "../schemas/paciente.schema.js";

export class PacienteService {
    async getPacienteById(id: string): Promise<PacienteDTO | null> {
        return paciente.findByPk(id) || null;
    }

    async getAllPacientes(): Promise<PacienteDTO[]> {
        return paciente.findAll();
    }

    async createPaciente(pacienteData: PacienteDTO): Promise<PacienteDTO> {
        const newPaciente = await paciente.create(pacienteData);
        return newPaciente;
    }

    async updatePaciente(id: string, pacienteData: Partial<PacienteDTO>): Promise<PacienteDTO | null> {
        const existingPaciente = await paciente.findByPk(id);
        if (!existingPaciente) {
            return null;
        }

        await existingPaciente.update(pacienteData);
        return existingPaciente;
    }

    async deletePaciente(id: string): Promise<boolean> {
        const deletedCount = await paciente.destroy({ where: { id } });
        return deletedCount > 0;
    }
}