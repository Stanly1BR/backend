import z from 'zod';
export const authSchema = z.object({
    id: z.uuid().optional(),
    nome: z.string().min(2),
    email: z.email(),
    password: z.string().min(6),
    tipo: z.enum(['medico', 'paciente']),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});
export const AuthResponseSchema = z.object({
    token: z.string(),
    userId: z.string().nullable(),
    authId: z.string(),
    tipo: z.enum(['medico', 'paciente']),
});
//# sourceMappingURL=auth.schema.js.map