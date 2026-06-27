import { type Request, type Response, type NextFunction } from 'express';
import { type ZodTypeAny } from 'zod';
export declare const validate: (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=validate.d.ts.map