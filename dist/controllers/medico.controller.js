import { Router } from 'express';
import { medicoSchema } from '../schemas/medico.schema.js';
import { MedicoService } from '../services/medico.service.js';
import { validate } from '../middlewares/validate.js';
export class MedicoController {
    router;
    medicoService;
    constructor() {
        this.router = Router();
        this.medicoService = new MedicoService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/', this.getAllMedicos.bind(this));
        this.router.get('/:id', this.getMedicoById.bind(this));
        this.router.post('/', validate(medicoSchema), this.createMedico.bind(this));
        this.router.put('/:id', validate(medicoSchema.partial()), this.updateMedico.bind(this));
        this.router.delete('/:id', this.deleteMedico.bind(this));
    }
    async getMedicoById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ error: 'ID is required' });
                return;
            }
            const medico = await this.medicoService.getMedicoById(id);
            if (!medico) {
                res.status(404).json({ error: 'Medico not found' });
                return;
            }
            res.status(200).json(medico);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getAllMedicos(req, res) {
        try {
            const medicos = await this.medicoService.getAllMedicos();
            res.status(200).json(medicos);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async createMedico(req, res) {
        try {
            const medicoData = req.body;
            const newMedico = await this.medicoService.createMedico(medicoData);
            res.status(201).json(newMedico);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async updateMedico(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ error: 'ID is required' });
                return;
            }
            const medicoData = req.body;
            const updatedMedico = await this.medicoService.updateMedico(id, medicoData);
            if (!updatedMedico) {
                res.status(404).json({ error: 'Medico not found' });
                return;
            }
            res.status(200).json(updatedMedico);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async deleteMedico(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ error: 'ID is required' });
                return;
            }
            const deleted = await this.medicoService.deleteMedico(id);
            if (!deleted) {
                res.status(404).json({ error: 'Medico not found' });
                return;
            }
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
//# sourceMappingURL=medico.controller.js.map