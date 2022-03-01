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
//Llamado de librerias externas.
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const auth_1 = __importDefault(require("../routes/auth"));
class Application {
    constructor() {
        //Especificación de la usabilidad de las librerias importadas.
        this.app = (0, express_1.default)();
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        //Rutas de los módulos.
        this.app.use(auth_1.default);
    }
    start(port) {
        return __awaiter(this, void 0, void 0, function* () {
            //Especificación del puerto para correr el servidor.
            yield this.app.listen(port);
            console.log("Servidor Corriendo en el puerto " + port);
        });
    }
}
exports.default = Application;
//# sourceMappingURL=server.js.map