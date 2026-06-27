import z from 'zod';
export declare const consultaSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodUUID>;
    pacienteId: z.ZodUUID;
    medicoId: z.ZodUUID;
    data: z.z.ZodCoercedDate<unknown>;
    horario: z.ZodString;
    motivo: z.ZodString;
    status: z.ZodEnum<{
        agendada: "agendada";
        cancelada: "cancelada";
        concluida: "concluida";
    }>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, z.z.core.$strip>;
export type ConsultaDTO = z.infer<typeof consultaSchema>;
//# sourceMappingURL=consulta.schema.d.ts.map