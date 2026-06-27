import { Router, type Request, type Response } from 'express';
import type { LoginDTO, RegisterDTO, AuthResponseDTO } from '../schemas/auth.schema.js';
import { AuthService } from '../services/auth.service.js';

export class AuthController {
    public router: Router;
    private authService: AuthService;

    constructor() {
        this.router = Router();
        this.authService = new AuthService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/login', this.login.bind(this));
        this.router.post('/register', this.register.bind(this));
    }

    private async login(req: Request, res: Response): Promise<void> {
        try {
            const authData: LoginDTO = req.body;
            const response: AuthResponseDTO = await this.authService.Login(authData);
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    private async register(req: Request, res: Response): Promise<void> {
        try {
            const authData: RegisterDTO = req.body;
            const response: AuthResponseDTO = await this.authService.Register(authData);
            res.status(201).json(response);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }
}