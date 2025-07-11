import { userModel } from '../models/user.model'; 



const readById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userModel.findUser(id);
        if (!user) {
            return res.status(404).json({ message: "No se pudo encontrar al usuario" });
        }
        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

//crear usuario, datos que se solictan
const create = async (req, res) => {
    const { firstName, lastName, email, password, rut, photo } = req.body;
    if (!firstName || !lastName || !email || !password || !rut) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }
    const newUser = {
        firstName,
        lastName,
        email,
        password,
        rut,
        photo: photo,
    };

    try {
        const user = await userModel.create(newUser);
        return res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

const update = async (req, res) => {//preguntar acerca punto 40 a 54//
    const id = req.params.id;
    const userData = req.body;

    try {
        const updatedUser = await userModel.update(id, userData);
        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        return res.json(updatedUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

export const userController = {
    readById,
    create,
    update,
};
