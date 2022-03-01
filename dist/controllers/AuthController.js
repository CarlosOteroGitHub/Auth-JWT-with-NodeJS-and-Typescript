"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.tokenValidation = exports.signin = exports.signup = exports.show = void 0;
//Llamado de librerias externas.
require('dotenv').config();
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/* FUNCIONES PARA LA MANIPULACIÓN DE DATOS MEDIANTE UNA API */
/* Función para mostrar una lista de todos los registros dentro del modelo User. */
function show(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const usuarios = yield User_1.default.find();
        return res.json(usuarios);
    });
}
exports.show = show;
/* Función para crear un registro al modelo User mediante la recepción de datos de una interfaz. A su vez, la función retorna un JWT generado para el usuario creado. */
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new User_1.default({
            username: req.body.username,
            correo: req.body.correo,
            password: req.body.password,
        });
        //Encripta el campo contraseña y guarda en la base de datos el registro.
        user.password = yield user.encryptPassword(user.password);
        yield user.save();
    });
}
exports.signup = signup;
/* Función para validar la existencia de un usuario dentro del modelo User. En el momento en que se valide su existencia, se retorna un JWT generado para el usuario logeado. */
function signin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //Busca el usuario en el modelo y valida que el correo sea correcto.
        const user_found_by_correo = yield User_1.default.findOne({ correo: req.body.correo });
        if (!user_found_by_correo) {
            return res.status(400).json("El correo electrónico es incorrecto!");
        }
        //Busca el usuario en el modelo y valida que la contraseña sea correcta.
        const user_found_by_password = yield user_found_by_correo.validatePassword(req.body.password);
        if (!user_found_by_password) {
            return res.status(400).json("La contraseña es incorrecta!");
        }
        //Genera un JWT para el usuario logeado e impone una condición de vencimiento de 1 día.
        const token = jsonwebtoken_1.default.sign({ _id: user_found_by_correo._id }, process.env.SECRET_TOKEN || 'myTokenJSW', {
            expiresIn: 60 * 60 * 24
        });
        res.header('auth-token', token).json(user_found_by_correo);
    });
}
exports.signin = signin;
/* Función middleware la cual valida que la variable "auth-token" de la cabecera (header) contenga el token generado mediante la ejecución de la función "signin" */
function tokenValidation(req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json("Acceso denegado, no se encontro el token!");
    }
    else {
        jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN || 'myTokenJSW');
    }
    next();
}
exports.tokenValidation = tokenValidation;
/* Función que se ejecuta despues de que la función middleware "tokenValidation" haya validado si el token generado con la función "signin" es correcto. Si asi fuera, el flujo del programa entra a la función "profile" para mostrar un mensaje de login exitoso */
function profile(req, res) {
    res.json("Su cuenta de usuario se ha logeado con exito!");
}
exports.profile = profile;
//# sourceMappingURL=AuthController.js.map