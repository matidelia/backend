import express from 'express'
import cors from 'cors'
import platosRoutes from './routes/platos.routes.js'
import userRoutes from './routes/user.routes.js'
import auditoriasRoutes from './routes/auditorias.routes.js'

import { connectDB } from './db.js';
import cookieParser from 'cookie-parser';

import path from 'path'
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')))

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json());
app.use(cookieParser())

app.use('/api/', platosRoutes)
app.use('/api/', userRoutes)
app.use('/api/', auditoriasRoutes)

app.listen(8080, console.log('Server corriendo en el puerto 8080'))
connectDB();