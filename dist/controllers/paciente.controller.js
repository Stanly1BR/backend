import { Router } from 'express';
import { pacienteSchema } from '../schemas/paciente.schema.js';
import { PacienteService } from '../services/paciente.service.js';
import { validate } from '../middlewares/validate.js';
export class PacienteController {
    router;
    pacienteService;
    constructor() {
        this.router = Router();
        this.pacienteService = new PacienteService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/', this.getAllPacientes.bind(this));
        this.router.get('/:id', this.getPacienteById.bind(this));
        this.router.post('/', validate(pacienteSchema), this.createPaciente.bind(this));
        this.router.put('/:id', validate(pacienteSchema.partial()), this.updatePaciente.bind(this));
        this.router.delete('/:id', this.deletePaciente.bind(this));
    }
    async getPacienteById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ error: 'ID is required' });
                return;
            }
            const paciente = await this.pacienteService.getPacienteById(id);
            if (!paciente) {
                res.status(404).json({ error: 'Paciente not found' });
                return;
            }
            res.status(200).json(paciente);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getAllPacientes(req, res) {
        try {
            const pacientes = await this.pacienteService.getAllPacientes();
            res.status(200).json(pacientes);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async createPaciente(req, res) {
        try {
            const pacienteData = req.body;
            const newPaciente = await this.pacienteService.createPaciente(pacienteData);
            res.status(201).json(newPaciente);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async updatePaciente(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ error: 'ID is required' });
                return;
            }
            const pacienteData = req.body;
            const updatedPaciente = await this.pacienteService.updatePaciente(id, pacienteData);
            if (!updatedPaciente) {
                res.status(404).json({ error: 'Paciente not found' });
                return;
            }
            res.status(200).json(updatedPaciente);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async deletePaciente(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ error: 'ID is required' });
                return;
            }
            const deleted = await this.pacienteService.deletePaciente(id);
            if (!deleted) {
                res.status(404).json({ error: 'Paciente not found' });
                return;
            }
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
//# sourceMappingURL=paciente.controller.js.map