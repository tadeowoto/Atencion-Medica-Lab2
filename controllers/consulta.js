import { doctorDB } from "../models/doctorDB.js";
import { SECRET_KEY } from "../config/config.mjs";
import { pacienteDB } from "../models/pacienteDB.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class consultaControl{
    
    static async cargarConsulta(req, res){
        const { idDePaciente } = req.params;
        const alergias = await pacienteDB.buscarAlergiaPorPaciente(idDePaciente);
        const antecedentes = await pacienteDB.buscarAntecedentePorPaciente(idDePaciente);
        const habitos = await pacienteDB.buscarHabitoPorPaciente(idDePaciente);
        const medicamentos = await pacienteDB.buscarMedicamentoPorPaciente(idDePaciente);
        const nombre = await pacienteDB.buscarNombrePorIdPaciente(idDePaciente);
        const alergiasOpciones = [
            "Choque anafiláctico alérgico",
            "Consulta para instrucción y vigilancia dietética sobre la alergia",
            "Alergia en contacto con la piel",
            "Alergia a ambrosía (polen) (fiebre del heno)",
            "Alergia a un animal (caspa) (epidermis) (pelos) (rinitis)",
            "Alergia a un árbol (cualquiera) (fiebre del heno) (polen)",
            "Fiebre del heno con asma",
            "Alergia biológica (ver Alergia, droga)",
            "Alergia a la caspa (animal) (rinitis)",
            "Choque alérgico (anafiláctico)",
            "Choque alérgico debido a efecto adverso de sustancia medicinal correctamente administrada",
            "Choque alérgico por suero o inmunización",
            "Colitis alérgica",
            "Alergia a cosméticos, perfumes",
            "Dermatitis alérgica (ver también Dermatitis)",
            "Alergia a una droga, medicamento o producto biológico (cualquiera) (externo) (interno) (sustancia medicinal administrada apropiadamente)",
            "Alergia a una sustancia errónea administrada o tomada NCOP"
        ];
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


        res.render('consulta', {alergias, antecedentes, habitos, medicamentos, nombre: nombre[0], historialPacienteMedico, historialPacienteGeneral, nombreDoctor: nombreMedico, alergiasOpciones, pacienteId: idDePaciente});
    }


    static async insertarConsulta(req,res){

        const { evolucion, 
                diagnosticos, 
                estadosDiagnosticos, 
                alergias, 
                importancia, 
                desdeAlergias, 
                hastaAlergias, 
                habitos, 
                desdeHabitos, 
                hastaHabitos, 
                antecedentes, 
                desdeAntecedentes, 
                hastaAntecedentes, 
                medicamentos, } = req.body; // <-- todos los datos del form

        const { idDePaciente } = req.params; // <-- id de la ruta

        const token = req.cookies.ACC_TOK
        if(!token){
            return res.status(401).redirect('/');
        }
        try {
            const data = jwt.verify(token,SECRET_KEY);
            const doctorId = data.id;
        } catch (error) {
            res.status(401).send("Token invalido.")
        }




        //id del turno desde la agenda? id del turno para diagnostico y evolucion
        //id paciente en la ruta <-- hice esta en el action del form :))))))
        //pasar estado a atendido
        //render a agenda, user medico, agenda(id medico), fechaactual
    }


}