import consulta from "../models/consulta.js";
export class ConsultaService {
    async getConsultaById(id) {
        return consulta.findByPk(id) || null;
    }
    async getAllConsultas() {
        return consulta.findAll();
    }
    async createConsulta(consultaData) {
        const newConsulta = await consulta.create(consultaData);
        return newConsulta;
    }
    async updateConsulta(id, consultaData) {
        const existingConsulta = await consulta.findByPk(id);
        if (!existingConsulta) {
            return null;
        }
        await existingConsulta.update(consultaData);
        return existingConsulta;
    }
    async deleteConsulta(id) {
        const deletedCount = await consulta.destroy({ where: { id } });
        return deletedCount > 0;
    }
}
//# sourceMappingURL=consulta.service.js.map