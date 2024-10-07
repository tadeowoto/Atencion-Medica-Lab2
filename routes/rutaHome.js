import express from "express";
import { doctorControl } from "../controllers/doctor.js";

const router = express.Router();

router.get('/', (req,res)=>{res.render('home')});
router.post('/login', doctorControl.login)
router.get('/agenda', doctorControl.cargarAgenda);

export { router };