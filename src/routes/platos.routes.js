import { Router } from "express";
import { crearPlato, eliminarPlato, listarCategoriasPlatos, listarPlatoPorID, listarPlatos, listarPlatosPorCategoria, listarPlatosPrincipales, modificarPlato } from "../controllers/platos.controller.js";
import { adminRequerido, authRequerida } from "../middlewares/validarToken.js";
import multer from "multer";
// config multer
const storage = multer.diskStorage({
    destination: './src/public/uploads',
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const router = Router();

const upload = multer({ storage })

router.get('/platos', listarPlatos)
router.get('/platos/categorias', listarCategoriasPlatos)
router.get('/plato/:id', listarPlatoPorID)
router.get('/platos/principales', listarPlatosPrincipales)
router.get('/platos/categoria/:categoria', listarPlatosPorCategoria)


router.post('/platos', authRequerida, adminRequerido, upload.single('portada'), crearPlato)
router.put('/platos/:id', authRequerida, adminRequerido, upload.single('nuevaPortada'), modificarPlato)
router.delete('/platos/:id', authRequerida, adminRequerido, eliminarPlato)

export default router;