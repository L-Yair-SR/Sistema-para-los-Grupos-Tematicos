//Importación de Librerias
import express from 'express';
import cors from 'cors';
import {dirname, join} from 'path';
import { fileURLToPath } from 'url';
import { PORT } from "./config.js";
import indexRoutes from './routes/index.routes.js';
import taskRoutes from './routes/task.routes.js';
import ueasRoutes from './routes/ueas.routes.js';
import gtRoutes from './routes/gt.routes.js';
import loginRoutes from './routes/login.routes.js';
import minutasRoutes from './routes/minutas.routes.js';
import filesRoutes from './routes/file.routes.js'
import pdfRoutes from './routes/pdf.routes.js'
import sintRoutes from './routes/sintetico.routers.js'

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json())

app.use(indexRoutes)
app.use(taskRoutes)
app.use(gtRoutes)
app.use(ueasRoutes)
app.use(loginRoutes)
app.use(minutasRoutes)
app.use(filesRoutes)
app.use(pdfRoutes)
app.use(sintRoutes)

app.use(express.static(join(__dirname, '../client/dist')));

app.listen(PORT)
console.log(`Servidor corriendo en el puerto ${PORT}`);