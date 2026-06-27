import { Router, type Request, type Response } from 'express';
import { medicoSchema, type MedicoDTO } from '../schemas/medico.schema.js';
import { MedicoService } from '../services/medico.service.js';
import { validate } from '../middlewares/validate.js';

export class MedicoController {
    public router: Router;
    private medicoService: MedicoService;

    constructor() {
        this.router = Router();
        this.medicoService = new MedicoService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.getAllMedicos.bind(this));
        this.router.get('/:id', this.getMedicoById.bind(this));
        this.router.post('/', validate(medicoSchema), this.createMedico.bind(this));
        this.router.put('/:id', validate(medicoSchema.partial()), this.updateMedico.bind(this));
        this.router.delete('/:id', this.deleteMedico.bind(this));
    }

    private async getMedicoById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params as { id: string };
            
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
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    private async getAllMedicos(req: Request, res: Response): Promise<void> {
        try {
            const medicos = await this.medicoService.getAllMedicos();
            res.status(200).json(medicos);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    private async createMedico(req: Request, res: Response): Promise<void> {
        try {
            const medicoData: MedicoDTO = req.body;
            const newMedico = await this.medicoService.createMedico(medicoData);
            res.status(201).json(newMedico);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    private async updateMedico(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params as { id: string };
            
            if (!id) {
                res.status(400).json({ error: 'ID is required' });
                return;
            }

            const medicoData: Partial<MedicoDTO> = req.body;
            const updatedMedico = await this.medicoService.updateMedico(id, medicoData);
            
            if (!updatedMedico) {
                res.status(404).json({ error: 'Medico not found' });
                return;
            }
            
            res.status(200).json(updatedMedico);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    private async deleteMedico(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params as { id: string };
            
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
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}