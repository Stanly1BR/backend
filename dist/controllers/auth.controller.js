import { Router } from 'express';
import { AuthService } from '../services/auth.service.js';
export class AuthController {
    router;
    authService;
    constructor() {
        this.router = Router();
        this.authService = new AuthService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/login', this.login.bind(this));
        this.router.post('/register', this.register.bind(this));
    }
    async login(req, res) {
        try {
            const authData = req.body;
            const response = await this.authService.Login(authData);
            res.status(200).json(response);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async register(req, res) {
        try {
            const authData = req.body;
            const response = await this.authService.Register(authData);
            res.status(201).json(response);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
//# sourceMappingURL=auth.controller.js.map