import { Router } from "express";
import { crearPlato, eliminarPlato, listarPlatos, listarPlatosPorCategoria, modificarPlato } from "../controllers/platos.controller.js";
import { adminRequerido, authRequerida } from "../middlewares/validarToken.js";

const router = Router();

router.get('/platos', listarPlatos)
router.get('/platos/:categoria', listarPlatosPorCategoria)

router.post('/platos', authRequerida, adminRequerido, crearPlato)
router.put('/platos/:id', authRequerida, adminRequerido, modificarPlato)
router.delete('/platos/:id', authRequerida, adminRequerido, eliminarPlato)

export default router;