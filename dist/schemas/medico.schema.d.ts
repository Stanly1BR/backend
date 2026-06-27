import z from 'zod';
export declare const medicoSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodUUID>;
    nome: z.ZodString;
    crm: z.ZodString;
    especialidade: z.ZodString;
    authId: z.ZodUUID;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, z.z.core.$strip>;
export type MedicoDTO = z.infer<typeof medicoSchema>;
//# sourceMappingURL=medico.schema.d.ts.map