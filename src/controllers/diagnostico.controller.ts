import { Router, type Request, type Response } from 'express';
import  { diagnosticosSchema, type DiagnosticoDTO } from '../schemas/diagnosticos.schema.js';
import { validate } from '../middlewares/validate.js';
import { DiagnosticoService } from '../services/diagnostico.service.js';

export class DiagnosticoController {
    public router: Router;
    private diagnosticoService: DiagnosticoService;

    constructor() {
        this.router = Router();
        this.diagnosticoService = new DiagnosticoService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.getAllDiagnosticos.bind(this));
        this.router.get('/:id', this.getDiagnosticoById.bind(this));
        this.router.post('/', validate(diagnosticosSchema), this.createDiagnostico.bind(this));
        this.router.put('/:id', validate(diagnosticosSchema.partial()), this.updateDiagnostico.bind(this));
        this.router.delete('/:id', this.deleteDiagnostico.bind(this));
    }

    private async getDiagnosticoById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params as { id: string };

            if (!id) {
                res.status(400).json({ error: 'ID is required' });
                return;
            }

            const diagnostico = await this.diagnosticoService.getDiagnosticoById(id);
            if (!diagnostico) {
                res.status(404).json({ error: 'Diagnostico not found' });
                return;
            }

            res.status(200).json(diagnostico);
        }
        catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    private async getAllDiagnosticos(req: Request, res: Response): Promise<void> {
        try {
            const diagnosticos = await this.diagnosticoService.getAllDiagnosticos();
            res.status(200).json(diagnosticos);
        }
        catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    private async createDiagnostico(req: Request, res: Response): Promise<void> {
        try {
            const diagnosticoData: DiagnosticoDTO = req.body;
            const newDiagnostico = await this.diagnosticoService.createDiagnostico(diagnosticoData);
            res.status(201).json(newDiagnostico);
        }
        catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    private async updateDiagnostico(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params as { id: string };
            const diagnosticoData: Partial<DiagnosticoDTO> = req.body;

            if (!id) {
                res.status(400).json({ error: 'ID is required' });
                return;
            }

            const updatedDiagnostico = await this.diagnosticoService.updateDiagnostico(id, diagnosticoData);
            if (!updatedDiagnostico) {
                res.status(404).json({ error: 'Diagnostico not found' });
                return;
            }

            res.status(200).json(updatedDiagnostico);
        }
        catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    private async deleteDiagnostico(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params as { id: string };

            if (!id) {
                res.status(400).json({ error: 'ID is required' });
                return;
            }

            const deletedDiagnostico = await this.diagnosticoService.deleteDiagnostico(id);
            if (!deletedDiagnostico) {
                res.status(404).json({ error: 'Diagnostico not found' });
                return;
            }

            res.status(200).json({ message: 'Diagnostico deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}