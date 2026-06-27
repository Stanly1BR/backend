import consulta from "../models/consulta.js";
import type { ConsultaDTO } from "../schemas/consulta.schema.js";

export class ConsultaService {
    async getConsultaById(id: string): Promise<ConsultaDTO | null> {
        return consulta.findByPk(id) || null;
    }

    async getAllConsultas(): Promise<ConsultaDTO[]> {
        return consulta.findAll();
    }

    async createConsulta(consultaData: ConsultaDTO): Promise<ConsultaDTO> {
        const newConsulta = await consulta.create(consultaData);
        return newConsulta;
    }

    async updateConsulta(id: string, consultaData: Partial<ConsultaDTO>): Promise<ConsultaDTO | null> {
        const existingConsulta = await consulta.findByPk(id);

        if (!existingConsulta) {
            return null;
        }

        await existingConsulta.update(consultaData);
        return existingConsulta;
    }

    async deleteConsulta(id: string): Promise<boolean> {
        const deletedCount = await consulta.destroy({ where: { id } });
        return deletedCount > 0;
    }
}