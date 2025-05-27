import express from 'express'
import platosRoutes from './routes/platos.routes.js'
import userRoutes from './routes/user.routes.js'

import { connectDB } from './db.js';
const app = express();

app.use(express.json());

app.use('/api/', platosRoutes)
app.use('/api/', userRoutes)

app.listen(8080, console.log('Server corriendo en el puerto 8080'))
connectDB();