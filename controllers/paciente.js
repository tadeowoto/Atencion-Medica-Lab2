import { pacienteDB } from "../models/pacienteDB.js";
import { doctorDB } from "../models/doctorDB.js";
import { SECRET_KEY } from "../config/config.mjs";
import jwt from "jsonwebtoken";

export class pacienteControl{

    static async cargarPerfil(req, res){
        // esto son las stats del paciente
        const { idDePaciente } = req.params;
        const alergias = await pacienteDB.buscarAlergiaPorPaciente(idDePaciente);
        const antecedentes = await pacienteDB.buscarAntecedentePorPaciente(idDePaciente);
        const habitos = await pacienteDB.buscarHabitoPorPaciente(idDePaciente);
        const medicamentos = await pacienteDB.buscarMedicamentoPorPaciente(idDePaciente);
        const nombre = await pacienteDB.buscarNombrePorIdPaciente(idDePaciente);
        const token = req.cookies.ACC_TOK
        let historialPacienteMedico
        let nombreMedico
        //ahora esto es el historial del medico con el paciente
        if(!token){
            return res.status(401).redirect('/');
        }
        try {
            const data = jwt.verify(token,SECRET_KEY);
            nombreMedico= data.user
            const Doctorid = data.id;
            historialPacienteMedico = await pacienteDB.buscarHistorialPorPacienteYMedico(Doctorid,idDePaciente);
        } catch (error) {
            res.status(401).send("Token invalido.") // todo <-- hacer la vista 401 para el error del token
        }
        //cargamos el historial general del paciente
        const historialPacienteGeneral = await pacienteDB.buscarHistorialDePaciente(idDePaciente);
        
        if(historialPacienteGeneral){
            for(let e of historialPacienteGeneral){
                e.diagnosticos = []                
                const diagnosticos = await doctorDB.buscarDiagnosticosPorAgenda(e.id)
                if(diagnosticos){
                    diagnosticos.forEach(d => {
                        e.diagnosticos.push(d)                 
                    });
                }
            };
            historialPacienteGeneral.forEach(e => {
                const fechaOriginal = e.fecha;
                const fecha = new Date(fechaOriginal);
                const fechaFormateada = fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
                e.fecha = fechaFormateada;
            });
        }

        if(historialPacienteMedico){
            for(let e of historialPacienteMedico){
                e.diagnosticos = []                
                const diagnosticos = await doctorDB.buscarDiagnosticosPorAgenda(e.id)
                if(diagnosticos){
                    diagnosticos.forEach(d => {
                        e.diagnosticos.push(d)                 
                    });
                }
            };
            historialPacienteMedico.forEach(e => {
                const fechaOriginal = e.fecha;
                const fecha = new Date(fechaOriginal);
                const fechaFormateada = fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
                e.fecha = fechaFormateada;
            });
        }


        res.render('paciente', {alergias, antecedentes, habitos, medicamentos, nombre: nombre[0], historialPacienteMedico, historialPacienteGeneral, nombreDoctor: nombreMedico});
    }

}