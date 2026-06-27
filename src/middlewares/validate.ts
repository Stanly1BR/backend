import { type Request, type Response, type NextFunction } from 'express';
import { ZodError, type ZodTypeAny } from 'zod';

export const validate = (schema: ZodTypeAny) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'error',
          message: 'Erro de validação',
          errors: error.issues.map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message,
          })),
        });
      }

      return res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor',
      });
    }
  };