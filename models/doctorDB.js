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

export class doctorDB {

    static async buscarDoctorPorUsuario(usuario){
        const [res] = await con.query('SELECT * FROM medico WHERE usuario = ?', [usuario]); 
        if (res.length === 0) {
            console.log("No se encontró ningún doctor con ese usuario.");
            return null;
        }
        return res;
    }

    static async buscarTurnosPorMedico(doctor){
        const [res] = await con.query('SELECT t.fecha, t.inicio, t.paciente, p.nombre, t.estado FROM turnos t JOIN agenda a ON t.agenda = a.id JOIN medico m ON a.medico = m.id JOIN paciente p ON t.paciente = p.id WHERE m.id = ?;', [doctor]); 
        if (res.length === 0) {
            console.log("No se encontró ningún turno registrado.");
            return null;
        }
        return res;
    }

}