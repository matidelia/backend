import { Router } from "express";
import { listarAuditoriasPlatos, listarAuditoriasUsers } from "../controllers/auditorias.controller.js";
import { adminRequerido, authRequerida } from "../middlewares/validarToken.js";
const router = Router();

router.get('/auditorias/users',authRequerida, adminRequerido, listarAuditoriasUsers)
router.get('/auditorias/platos',authRequerida, adminRequerido, listarAuditoriasPlatos)


export default router;