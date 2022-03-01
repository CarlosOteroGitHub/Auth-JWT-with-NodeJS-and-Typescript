"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Llamado de librerias externas.
const express_1 = require("express");
const router = (0, express_1.Router)();
const AuthController_1 = require("../controllers/AuthController");
/* RUTAS PARA LA MANIPULACIÓN DE DATOS MEDIANTE UNA API */
router.route("/api/list")
    .get(AuthController_1.show);
router.route("/api/signup")
    .post(AuthController_1.signup);
router.route("/api/signin")
    .post(AuthController_1.signin);
router.route("/api/profile")
    .get(AuthController_1.tokenValidation, AuthController_1.profile);
exports.default = router;
//# sourceMappingURL=auth.js.map