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

    static async actualizarEstadoConsulta(){}
    
}