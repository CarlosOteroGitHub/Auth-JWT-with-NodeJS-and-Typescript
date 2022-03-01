//Llamado de librerias externas.
import express from "express";
import morgan from "morgan";
import authRouter from "../routes/auth";

class Application {
	
	private app: express.Application;

	constructor(){

		//Especificación de la usabilidad de las librerias importadas.
		this.app = express();

		this.app.use(morgan('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({extended: false}));

		//Rutas de los módulos.
		this.app.use(authRouter);
	}

	async start(port:number){
		//Especificación del puerto para correr el servidor.
		await this.app.listen(port);
		console.log("Servidor Corriendo en el puerto " + port);
	}
}

export default Application;