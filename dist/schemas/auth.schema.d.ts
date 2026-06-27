import z from 'zod';
export declare const authSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodUUID>;
    nome: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    tipo: z.ZodEnum<{
        medico: "medico";
        paciente: "paciente";
    }>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, z.z.core.$strip>;
export type AuthDTO = z.infer<typeof authSchema>;
export type LoginDTO = Pick<AuthDTO, 'email' | 'password'>;
export type RegisterDTO = Omit<AuthDTO, 'id' | 'createdAt' | 'updatedAt'>;
export declare const AuthResponseSchema: z.ZodObject<{
    token: z.ZodString;
    userId: z.ZodNullable<z.ZodString>;
    authId: z.ZodString;
    tipo: z.ZodEnum<{
        medico: "medico";
        paciente: "paciente";
    }>;
}, z.z.core.$strip>;
export type AuthResponseDTO = z.infer<typeof AuthResponseSchema>;
//# sourceMappingURL=auth.schema.d.ts.map