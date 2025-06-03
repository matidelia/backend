import express from 'express'
import platosRoutes from './routes/platos.routes.js'
import userRoutes from './routes/user.routes.js'

import { connectDB } from './db.js';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(cookieParser())

app.use('/api/', platosRoutes)
app.use('/api/', userRoutes)

app.listen(8080, console.log('Server corriendo en el puerto 8080'))
connectDB();