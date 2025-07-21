import { userModel } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { upload } from "../middlewares/upload.middleware.js";


const SECRET_KEY = process.env.JWT_SECRET || 'unhogarmaspassword';
const JWT_EXPIRES_IN = '1h';

//Registro del usuario
const register = async (req, res) => {


    
    const { first_name, last_name, email, password, rut } = req.body;
    const photo = req.file ? req.file.filename : null;

    if (!first_name || !last_name || !email || !rut || !password) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }


    try {
        const userExist = await userModel.findByEmail(email);
        if (userExist) {
            return res.status(409).json({ message: 'El correo electrónico ya está en uso' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            first_name,
            last_name,
            email,
            rut,
            password: hashedPassword,
            photo: photo ? `../uploads/${photo}` : null
        });

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email }, 
            SECRET_KEY,
            { expiresIn: '1h' } 
        );

        return res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser, token });
    } catch (error) {
        console.error('Error en el register:', error);
        return res.status(500).json({
            message: 'Error en el servidor',
            error: error.message
        });
    }
};
//login del usuario
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Correo electrónico y contraseña requeridos' });
    }

    try {
        const user = await userModel.findByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
            
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ id: user.id, email: user.email, role: user.userRole }, SECRET_KEY, { expiresIn: '2h' });

        return res.json({ message: 'Login exitoso', token, user});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};



//actualizar informacion del usuario 
const update = async (req, res) => {
    const userId = req.user.id;
    const { first_name, last_name, email } = req.body;


    if (!first_name && !last_name && !email) {
        return res.status(400).json({ message: 'No se proporcionaron campos para actualizar' });
    }

    try {
        const updatedUser = await userModel.update(userId, { first_name, last_name, email });

        return res.status(200).json({
            message: 'Perfil actualizado con éxito',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error al actualizar perfil:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
}


export const userController = {
    update,
    register,
    login,
};
