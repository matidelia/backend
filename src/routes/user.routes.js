import { Router } from "express";
import { crearUsuario, eliminarUsuario, listarUsuarios, listarUsuariosPorNombre, modificarUsuario } from "../controllers/user.controller.js";

const router = Router();

router.post('/user', crearUsuario)
router.put('/user/:id', modificarUsuario)
router.delete('/user/:id', eliminarUsuario)
router.get('/user/', listarUsuarios)
router.get('/user/nombre', listarUsuariosPorNombre)

export default router;