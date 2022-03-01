//Llamado de librerias externas.
require('dotenv').config();
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";

/* FUNCIONES PARA LA MANIPULACIÓN DE DATOS MEDIANTE UNA API */

/* Función para mostrar una lista de todos los registros dentro del modelo User. */
export async function show(req:Request, res:Response): Promise <Response> {
	const usuarios = await User.find();
	return res.json(usuarios);
}

/* Función para crear un registro al modelo User mediante la recepción de datos de una interfaz. A su vez, la función retorna un JWT generado para el usuario creado. */
export async function signup(req:Request, res:Response): Promise <void> {
    const user: IUser = new User({
        username: req.body.username,
        correo: req.body.correo,
        password: req.body.password,
    });

    //Encripta el campo contraseña y guarda en la base de datos el registro.
    user.password = await user.encryptPassword(user.password);
	await user.save();
}

/* Función para validar la existencia de un usuario dentro del modelo User. En el momento en que se valide su existencia, se retorna un JWT generado para el usuario logeado. */
export async function signin(req:Request, res:Response) {
    //Busca el usuario en el modelo y valida que el correo sea correcto.
    const user_found_by_correo = await User.findOne({correo: req.body.correo});
    if(!user_found_by_correo){
        return res.status(400).json("El correo electrónico es incorrecto!");
    }

    //Busca el usuario en el modelo y valida que la contraseña sea correcta.
    const user_found_by_password:boolean = await user_found_by_correo.validatePassword(req.body.password);
    if(!user_found_by_password){
        return res.status(400).json("La contraseña es incorrecta!");
    }

    //Genera un JWT para el usuario logeado e impone una condición de vencimiento de 1 día.
    const token:string = jwt.sign({_id: user_found_by_correo._id}, process.env.SECRET_TOKEN || 'myTokenJSW', {
        expiresIn: 60 * 60 * 24
    });

    res.header('auth-token', token).json(user_found_by_correo);
}

/* Función middleware la cual valida que la variable "auth-token" de la cabecera (header) contenga el token generado mediante la ejecución de la función "signin" */
export function tokenValidation(req:Request, res:Response, next: NextFunction){
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).json("Acceso denegado, no se encontro el token!");
    } else {
        jwt.verify(token, process.env.SECRET_TOKEN || 'myTokenJSW');
    }

    next();
}

/* Función que se ejecuta despues de que la función middleware "tokenValidation" haya validado si el token generado con la función "signin" es correcto. Si asi fuera, el flujo del programa entra a la función "profile" para mostrar un mensaje de login exitoso */
export function profile(req:Request, res:Response) {
    res.json("Su cuenta de usuario se ha logeado con exito!");
}