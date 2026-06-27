import { Router } from 'express';
import { ConsultaService } from '../services/consulta.service.js';
import { consultaSchema } from '../schemas/consulta.schema.js';
import { validate } from '../middlewares/validate.js';
export class ConsultaController {
    router;
    consultaService;
    constructor() {
        this.router = Router();
        this.consultaService = new ConsultaService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/', this.getAllConsultas.bind(this));
        this.router.get('/:id', this.getConsultaById.bind(this));
        this.router.post('/', validate(consultaSchema), this.createConsulta.bind(this));
        this.router.put('/:id', validate(consultaSchema.partial()), this.updateConsulta.bind(this));
        this.router.delete('/:id', this.deleteConsulta.bind(this));
    }
    async getConsultaById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ error: 'ID is required' });
                return;
            }
            const consulta = await this.consultaService.getConsultaById(id);
            if (!consulta) {
                res.status(404).json({ error: 'Consulta not found' });
                return;
            }
            res.status(200).json(consulta);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getAllConsultas(req, res) {
        try {
            const consultas = await this.consultaService.getAllConsultas();
            res.status(200).json(consultas);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async createConsulta(req, res) {
        try {
            const consultaData = req.body;
            const consulta = await this.consultaService.createConsulta(consultaData);
            res.status(201).json(consulta);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async updateConsulta(req, res) {
        try {
            const { id } = req.params;
            const consultaData = req.body;
            if (!id) {
                res.status(400).json({ error: 'ID is required' });
                return;
            }
            const updatedConsulta = await this.consultaService.updateConsulta(id, consultaData);
            if (!updatedConsulta) {
                res.status(404).json({ error: 'Consulta not found' });
                return;
            }
            res.status(200).json(updatedConsulta);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async deleteConsulta(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ error: 'ID is required' });
                return;
            }
            const deleted = await this.consultaService.deleteConsulta(id);
            if (!deleted) {
                res.status(404).json({ error: 'Consulta not found' });
                return;
            }
            res.status(200).json({ message: 'Consulta deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
//# sourceMappingURL=consulta.controller.js.map