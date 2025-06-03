import { Router } from "express";
import { crearUsuario, eliminarUsuario, listarUsuarios, listarUsuariosPorNombre, loginUsuario, logout, modificarUsuario } from "../controllers/user.controller.js";
import { adminRequerido, authRequerida } from "../middlewares/validarToken.js";

const router = Router();

router.post('/user', authRequerida, adminRequerido, crearUsuario)
router.put('/user/:id', authRequerida, adminRequerido, modificarUsuario)
router.delete('/user/:id', authRequerida, adminRequerido, eliminarUsuario)

router.get('/user/', listarUsuarios)
router.get('/user/nombre', listarUsuariosPorNombre)

router.post('/login', loginUsuario)
router.post('/logout', logout)

export default router;