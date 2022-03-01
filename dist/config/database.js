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
const mongoose_1 = __importDefault(require("mongoose"));
//Conexión a MongoDB y creación de base de datos.
const dbName = 'nodejs_jwt_typescript';
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect('mongodb://localhost/' + dbName), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            };
            console.log("Conexión a la base de datos establecida!");
        }
        catch (_a) {
            console.log("Error");
        }
    });
}
exports.default = connectDB;
//# sourceMappingURL=database.js.map