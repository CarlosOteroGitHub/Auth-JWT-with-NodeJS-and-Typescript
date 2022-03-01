//Llamado de librerias y archivos externas.
require('dotenv').config();
import Application from "./config/server";
import db from "./config/database";

//Especificación de la Configuración del Servidor.
const puerto = process.env.PORT || 3000;

const server = new Application();
server.start(Number(puerto));

//Conexión a la base de datos.
db();