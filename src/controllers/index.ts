import { Router } from "express";

import produtoRouter from "./produto.controller.js";
import clienteRouter from "./cliente.controller.js";
import pedidoRouter from "./pedido.controller.js";

const router = Router();

router.use(produtoRouter);
router.use(clienteRouter);
router.use(pedidoRouter);

export default router;