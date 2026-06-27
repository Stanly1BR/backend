import z from 'zod';
export declare const pacienteSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodUUID>;
    nome: z.ZodString;
    cpf: z.ZodString;
    dataNascimento: z.z.ZodCoercedDate<unknown>;
    telefone: z.ZodString;
    authId: z.ZodUUID;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, z.z.core.$strip>;
export type PacienteDTO = z.infer<typeof pacienteSchema>;
//# sourceMappingURL=paciente.schema.d.ts.map