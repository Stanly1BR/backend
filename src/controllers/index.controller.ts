import { Router } from 'express';

import { AuthController } from './auth.controller.js';
import { PacienteController } from './paciente.controller.js';
import { MedicoController } from './medico.controller.js';
import { ConsultaController } from './consulta.controller.js';
import { DiagnosticoController } from './diagnostico.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = Router();

router.use('/auth', new AuthController().router);

router.use(requireAuth);

router.use('/pacientes', new PacienteController().router);
router.use('/medicos', new MedicoController().router);
router.use('/consultas', new ConsultaController().router);
router.use('/diagnosticos', new DiagnosticoController().router);

export default router;