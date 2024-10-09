import express from "express";
import { PORT } from "./config/config.mjs";
import { router } from "./routes/rutaHome.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { corsMiddleware } from "./middlewares/cors.mjs";
import cookieParser from "cookie-parser";
import { doctorControl } from "./controllers/doctor.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url); // Obtiene el nombre del archivo actual
const __dirname = path.dirname(__filename); // Obtiene el directorio del archivo actual
app.use(express.static(path.join(__dirname, 'public'))); // Sirve archivos estáticos desde la carpeta 'public'



app.set('view engine', 'pug');
app.set('views', './views');
app.use('/', router);
app.listen(PORT, (req,res)=>{console.log(`Server: http://localhost:${PORT}`)});