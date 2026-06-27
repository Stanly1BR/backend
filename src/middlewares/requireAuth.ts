import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("Variável JWT_SECRET não configurada no .env!");
}

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
    // Busca o token no formato "Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: "Acesso negado: Header de autenticação ausente ou incorreto." });
        return;
    }

    // Extrai apenas a string do token
    const token = authHeader.split(' ')[1];

    // O AJUSTE: Garante que o token realmente existe após o "Bearer "
    if (!token) {
        res.status(401).json({ error: "Acesso negado: Token não fornecido." });
        return;
    }

    try {
        // Agora o TypeScript tem 100% de certeza que 'token' e 'JWT_SECRET' são strings
        jwt.verify(token, JWT_SECRET);
        
        next();
    } catch (error) {
        res.status(401).json({ error: "Acesso negado: Token inválido ou expirado." });
    }
};

export default requireAuth;