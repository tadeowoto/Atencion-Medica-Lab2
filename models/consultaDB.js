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

export class consultaDB {

    static async actualizarEstadoConsulta(idTurno){
        const [res] = await con.execute('UPDATE `turnos` SET `estado`= "atendido" WHERE id = ?', [idTurno]);
        if (res.length === 0) {
            console.log("No se pudo actualizar el estado del turno");
            return null;
        }
        return res;
    }
    
    static async insertarEvolucion(evolucion, idTurno){
        const [res] = await con.execute('UPDATE atencion_medica.agenda SET evolucion = ? WHERE id = (SELECT agenda FROM atencion_medica.turnos WHERE id = ?)', [evolucion, idTurno]); 
        if (res.length === 0) {
            console.log("No se pudo actualizar la evolucion");
            return null;
        }
        return res;
    }

    static async insertarDiagnostico(detalle, estado, agenda){
        const [res] = await con.execute('INSERT INTO `diagnosticos`(`estado`, `detalle`, `agenda`) VALUES (?,?,?)', [estado, detalle, agenda]); 
        if (res.length === 0) {
            console.log("No se pudo insertar el diagnostico");
            return null;
        }
        return res
    }

    static async insertarAlergia (nombre, importancia, desde, hasta, paciente){
        const [res] = await con.execute('INSERT INTO `alergias`(`nombre`, `importancia`, `desde`, `hasta`, `paciente`) VALUES (?,?,?,?,?)', [nombre, importancia, desde, hasta, paciente]); 
        if (res.length === 0) {
            console.log("No se pudo insertar la alergia");
            return null;
        }
        return res
    }

    static async insertarHabitos(detalle, desde, hasta, paciente){
        const [res] = await con.execute('INSERT INTO `habitos`(`detalle`, `desde`, `hasta`, `paciente`) VALUES (?,?,?,?)', [detalle, desde, hasta, paciente]); 
        if (res.length === 0) {
            console.log("No se pudo insertar el habito");
            return null;
        }
        return res
    }

    static async insertarAntecedente(detalle, desde, hasta, paciente){
        const [res] = await con.execute('INSERT INTO `antecedentes`(`detalle`, `desde`, `hasta`, `paciente`) VALUES (?,?,?,?)', [detalle, desde, hasta, paciente]); 
        if (res.length === 0) {
            console.log("No se pudo insertar el antecedente");
            return null;
        }
        return res
    }

    static async insertarMedicamento(detalle, paciente){
        const [res] = await con.execute('INSERT INTO `medicamentos`(`detalle`, `paciente`) VALUES (?,?)', [detalle, paciente]); 
        if (res.length === 0) {
            console.log("No se pudo insertar el medicamento");
            return null;
        }
        return res
    } 



}


