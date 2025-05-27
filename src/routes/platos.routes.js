import { Router } from "express";
import { crearPlato, eliminarPlato, listarPlatos, listarPlatosPorCategoria, modificarPlato } from "../controllers/platos.controller.js";

const router = Router();

router.get('/platos', listarPlatos)
router.get('/platos/:categoria', listarPlatosPorCategoria)

router.post('/platos', crearPlato)

router.put('/platos/:id', modificarPlato)

router.delete('/platos/:id', eliminarPlato)

export default router;