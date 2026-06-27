import { Router, type Request, type Response } from 'express';
import { pacienteSchema, type PacienteDTO } from '../schemas/paciente.schema.js';
import { PacienteService } from '../services/paciente.service.js';
import { validate } from '../middlewares/validate.js';

export class PacienteController {
    public router: Router;
    private pacienteService: PacienteService;

    constructor() {
        this.router = Router();
        this.pacienteService = new PacienteService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.getAllPacientes.bind(this));
        this.router.get('/:id', this.getPacienteById.bind(this));
        this.router.post('/', validate(pacienteSchema), this.createPaciente.bind(this));
        this.router.put('/:id', validate(pacienteSchema.partial()), this.updatePaciente.bind(this));
        this.router.delete('/:id', this.deletePaciente.bind(this));
    }

    private async getPacienteById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params as { id: string };
            
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
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    private async getAllPacientes(req: Request, res: Response): Promise<void> {
        try {
            const pacientes = await this.pacienteService.getAllPacientes();
            res.status(200).json(pacientes);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    private async createPaciente(req: Request, res: Response): Promise<void> {
        try {
            const pacienteData: PacienteDTO = req.body;
            const newPaciente = await this.pacienteService.createPaciente(pacienteData);
            res.status(201).json(newPaciente);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    private async updatePaciente(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params as { id: string };

            if (!id) {
                res.status(400).json({ error: 'ID is required' });
                return;
            }

            const pacienteData: Partial<PacienteDTO> = req.body;
            const updatedPaciente = await this.pacienteService.updatePaciente(id, pacienteData);
            
            if (!updatedPaciente) {
                res.status(404).json({ error: 'Paciente not found' });
                return;
            }
            
            res.status(200).json(updatedPaciente);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    private async deletePaciente(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params as { id: string };

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
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}