import express from "express";
import { doctorControl } from "../controllers/doctor.js";

const router = express.Router();

router.get('/', (req,res)=>{res.render('home')});
router.post('/login', doctorControl.login)
router.get('/agenda', doctorControl.cargarAgenda);
// router.post('/diagnostico', doctorControl.insertarDiagnostico); <-- esto deberia llamar a el controloador, el controlador revisa que campos vienen y dependiendo eso llama al modelo de cada insert
router.get('/agenda/:fecha', doctorControl.cargarAgendaPorFecha);
export { router };