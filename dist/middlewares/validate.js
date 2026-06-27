import {} from 'express';
import { ZodError } from 'zod';
export const validate = (schema) => async (req, res, next) => {
    try {
        req.body = await schema.parseAsync(req.body);
        return next();
    }
    catch (error) {
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
//# sourceMappingURL=validate.js.map