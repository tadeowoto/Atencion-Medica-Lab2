import mysql from 'mysql2/promise';
import { DB_PORT } from '../config/config.mjs';

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'atencion_medica',
    port: DB_PORT
};

const con = await mysql.createConnection(config);

export class pacienteDB {

    static async buscarHistorialPorPacienteYMedico(doctor, paciente){
        console.log('doctor',doctor)
        console.log('paciente',paciente)
        const [res] = await con.query('SELECT t.fecha, a.motivo, a.evolucion FROM turnos t JOIN agenda a ON t.agenda = a.id JOIN medico m ON a.medico = m.id JOIN paciente p ON t.paciente = p.id WHERE m.id = ? AND p.id = ?;', [doctor, paciente]); 
        console.log(res);
        if (res.length === 0) {
            console.log("No hay ningún turno registrado del paciente seleccionado.");
            return null;
        }
        return res;
    }

    static async buscarHistorialDePaciente(paciente){
        const [res] = await con.query('SELECT t.fecha, a.motivo, m.nombre FROM turnos t JOIN agenda a ON t.agenda = a.id JOIN medico m ON a.medico = m.id JOIN paciente p ON t.paciente = p.id WHERE p.id = ?;', [paciente]); 
        if (res.length === 0) {
            console.log("No hay ningún turno registrado del paciente seleccionado.");
            return null;
        }
        return res;
    }

    static async buscarMedicamentoPorPaciente(paciente){
        const [res] = await con.query('SELECT m.detalle AS medicamento FROM paciente p JOIN medicamentos m ON m.paciente = p.id WHERE p.id = ?;', [paciente]); 
        if (res.length === 0) {
            console.log("No hay ningún medicamento en uso del paciente seleccionado.");
            return null;
        }
        return res;
    }

    static async buscarAlergiaPorPaciente(paciente){
        const [res] = await con.query('SELECT a.nombre, a.importancia FROM paciente p JOIN alergias a ON a.paciente = p.id WHERE p.id = ?;', [paciente]); 
        if (res.length === 0) {
            console.log("No hay ninguna alergia del paciente seleccionado.");
            return null;
        }
        return res;
    }

    static async buscarHabitoPorPaciente(paciente){
        const [res] = await con.query('SELECT h.detalle AS habito FROM paciente p JOIN habitos h ON h.paciente = p.id WHERE p.id = ?;', [paciente]); 
        if (res.length === 0) {
            console.log("No hay ningun habito del paciente seleccionado.");
            return null;
        }
        return res;
    }

    static async buscarAntecedentePorPaciente(paciente){
        const [res] = await con.query('SELECT a.detalle AS antecedente FROM paciente p JOIN antecedentes a ON a.paciente = p.id WHERE p.id = ?;', [paciente]); 
        if (res.length === 0) {
            console.log("No hay ningun antecedente del paciente seleccionado.");
            return null;
        }
        return res;
    }

    static async buscarNombrePorIdPaciente(id){
        const [res] = await con.query('SELECT nombre FROM paciente WHERE id = ?;', [id]); 
        if (res.length === 0) {
            console.log("No se encontro el id del paciente.");
            return null;
        }
        return res;
    }

}