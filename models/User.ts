//Llamado de librerias externas.
import mongoose, { Document } from "mongoose";
import bcrypt from 'bcryptjs';

//Interfaz del modelo/colección User.
export interface IUser extends Document {
	username: string;
	correo: string;
	password: string;
	encryptPassword(password:string): Promise<string>;
	validatePassword(password:string): Promise<boolean>;
}

//Estructrua del modelo/colección User.
let UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
        min: 4,
        lowercase: true
	},

	correo: {
		type: String,
		required: true,
		unique: true,
        lowercase: true
	},

	password: {
		type: String,
		required: true
	}
});

//Función para encriptar el campo password.
UserSchema.methods.encryptPassword = async (password: string): Promise<String> => {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(password, salt);
}

//Función para validar la existencia de un usuario.
UserSchema.methods.validatePassword = async function(password: string): Promise<Boolean> {
	return await bcrypt.compare(password, this.password);
}

let User = mongoose.model<IUser>('User', UserSchema);

export default User;