//Llamado de librerias externas.
import { Router } from "express";
const router = Router();
import { show, signup, signin, profile, tokenValidation } from "../controllers/AuthController";

/* RUTAS PARA LA MANIPULACIÓN DE DATOS MEDIANTE UNA API */

router.route("/api/list")
    .get(show)

router.route("/api/signup")
    .post(signup)

router.route("/api/signin")
    .post(signin)

router.route("/api/profile")
    .get(tokenValidation, profile)

export default router;