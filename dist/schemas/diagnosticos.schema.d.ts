import z from 'zod';
export declare const diagnosticosSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodUUID>;
    descricao: z.ZodString;
    cid: z.ZodString;
    pacienteId: z.ZodUUID;
    consultaId: z.ZodUUID;
    dataDiagnostico: z.z.ZodCoercedDate<unknown>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, z.z.core.$strip>;
export type DiagnosticoDTO = z.infer<typeof diagnosticosSchema>;
//# sourceMappingURL=diagnosticos.schema.d.ts.map