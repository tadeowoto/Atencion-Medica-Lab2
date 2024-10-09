import { doctorDB } from "../models/doctorDB.js";
import { SECRET_KEY } from "../config/config.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class doctorControl{
    static async login(req, res){
        const { user, pass } = req.body
        const usuario = await doctorDB.buscarDoctorPorUsuario(user);
        if(!usuario){
            return res.render('home', { errorMessage: 'El usuario indicado no existe' });           
        }
        const contraseña = usuario[0].contraseña;
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const contraHash = await bcrypt.hash(contraseña,salt);
        const contraseñaEsCorrecta = await bcrypt.compare(pass,contraHash);
        if(!contraseñaEsCorrecta){
            return res.render('home', { errorMessage: 'La contraseña y el usuario no coinciden' });
        }
        const token = jwt.sign({id:usuario[0].id, user:usuario[0].nombre}, SECRET_KEY, {
            expiresIn:"3h"
        });
        res.cookie("ACC_TOK", token, {
            secure:process.env.NODE_ENV==="production",
        });
        res.redirect('./agenda');
    }

    static async cargarAgenda(req, res){
        const token = req.cookies.ACC_TOK
        if(!token){
            return res.status(401).redirect('/');
        }
        const fechaActual = new Date();
        const dia = fechaActual.getDate();
        const mes = fechaActual.getMonth() + 1;
        const anio = fechaActual.getFullYear();
        const fechaFormateada = `${anio}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
        const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
        const fechaFormateadaEsp = fechaActual.toLocaleDateString('es-ES', opciones);
        
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
        const token = req.cookies.ACC_TOK
        if(!token){
            return res.status(401).redirect('/');
        }
        const fechaActual = req.params.fecha;
        try {
            const data = jwt.verify(token,SECRET_KEY);
            const userid = data.id;
            const agenda = await doctorDB.buscarTurnosPorMedicoYFecha(userid, fechaActual);
            if(agenda === null){
                return res.json([]);
            }

            res.json(agenda);
        } catch (error) {
            res.status(401).send("Token invalido.");
        }
    }
}