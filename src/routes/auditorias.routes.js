import { Router } from "express";
import { listarAuditoriasPlatos, listarAuditoriasUsers } from "../controllers/auditorias.controller.js";
const router = Router();

router.get('/auditorias/users', listarAuditoriasUsers)
router.get('/auditorias/platos', listarAuditoriasPlatos)


export default router;