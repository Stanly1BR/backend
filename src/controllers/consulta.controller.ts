import { Router, type Request, type Response } from 'express';
import { ConsultaService } from '../services/consulta.service.js';
import { consultaSchema, type ConsultaDTO } from '../schemas/consulta.schema.js';
import { validate } from '../middlewares/validate.js';

export class ConsultaController {
    public router: Router;
    private consultaService: ConsultaService;

    constructor() {
        this.router = Router();
        this.consultaService = new ConsultaService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.getAllConsultas.bind(this));
        this.router.get('/:id', this.getConsultaById.bind(this));
        this.router.post('/', validate(consultaSchema), this.createConsulta.bind(this));
        this.router.put('/:id', validate(consultaSchema.partial()), this.updateConsulta.bind(this));
        this.router.delete('/:id', this.deleteConsulta.bind(this));
    }

    private async getConsultaById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params as { id: string };

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
            res.status(500).json({ error: (error as Error).message });
        }
    }

    private async getAllConsultas(req: Request, res: Response): Promise<void> {
        try {
            const consultas = await this.consultaService.getAllConsultas();
            res.status(200).json(consultas);
        }
        catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    private async createConsulta(req: Request, res: Response): Promise<void> {
        try {
            const consultaData: ConsultaDTO = req.body;
            const consulta = await this.consultaService.createConsulta(consultaData);
            res.status(201).json(consulta);
        }
        catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    private async updateConsulta(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params as { id: string };
            const consultaData: Partial<ConsultaDTO> = req.body;

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
            res.status(500).json({ error: (error as Error).message });
        }
    }

    private async deleteConsulta(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params as { id: string };

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
            res.status(500).json({ error: (error as Error).message });
        }
    }
}