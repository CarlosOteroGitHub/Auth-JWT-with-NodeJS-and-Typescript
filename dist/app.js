"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Llamado de librerias y archivos externas.
require('dotenv').config();
const server_1 = __importDefault(require("./config/server"));
const database_1 = __importDefault(require("./config/database"));
//Especificación de la Configuración del Servidor.
const puerto = process.env.PORT || 3000;
const server = new server_1.default();
server.start(Number(puerto));
//Conexión a la base de datos.
(0, database_1.default)();
//# sourceMappingURL=app.js.map