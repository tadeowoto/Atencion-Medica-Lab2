import { doctorDB } from "../models/doctorDB.js";
import { SECRET_KEY } from "../config/config.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class doctorControl{
    static async login(req, res){
        const { user, pass } = req.body
        const usuario = await doctorDB.buscarDoctorPorUsuario(user);
        if(!usuario){
            throw new Error("El usuario indicado no existe");            
        }
        const contraseña = usuario[0].contraseña;
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const contraHash = await bcrypt.hash(contraseña,salt);
        const contraseñaEsCorrecta = await bcrypt.compare(pass,contraHash);
        if(!contraseñaEsCorrecta){
            throw new Error("La contraseña y el usuario no coinciden"); 
        }
        const token = jwt.sign({id:usuario[0].id, user:usuario[0].nombre}, SECRET_KEY, {
            expiresIn:"3h"
        });
        res.cookie("ACC_TOK", token, {
            secure:process.env.NODE_ENV==="production"
        });
        res.redirect('./agenda');
    }

    static async cargarAgenda(req, res){
        const token = req.cookies.ACC_TOK
        if(!token){
            return res.status(401).redirect('/');
        }
        const fechaActual = new Date(); // Obtiene la fecha y hora actual
        const dia = fechaActual.getDate(); // Día del mes (1-31)
        const mes = fechaActual.getMonth() + 1; // Mes (0-11, por eso sumamos 1)
        const anio = fechaActual.getFullYear(); // Año (ej. 2024)
        const fechaFormateada = `${anio}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
        const opciones = { day: 'numeric', month: 'long', year: 'numeric' }; // Formato deseado
        const fechaFormateadaEsp = fechaActual.toLocaleDateString('es-ES', opciones); // Formatea en español
        
        try {
            const data = jwt.verify(token,SECRET_KEY);
            const userid = data.id;
            const agenda = await doctorDB.buscarTurnosPorMedicoYFecha(userid, fechaFormateada);
            if(!agenda){
                return res.render('agenda', {doctor:data.user, agenda:null, fecha:fechaFormateadaEsp});
            }
            res.render('agenda', {doctor:data.user, agenda, fecha:fechaFormateadaEsp});
        } catch (error) {
            res.status(401).send("Token invalido.")
        }
    }

    static async cargarAgendaPorFecha(req, res){
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        const token = req.cookies.ACC_TOK
        if(!token){
            return res.status(401).redirect('/');
        }

        const fechaActual = req.params.fecha; // Obtiene la fecha y hora actual
        console.log('fecha desde el back',fechaActual)
    }
}