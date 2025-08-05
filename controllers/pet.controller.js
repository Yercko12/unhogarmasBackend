import { petModel } from "../models/pet.model.js";
import { upload } from "../middlewares/upload.middleware.js";
import fs from 'fs/promises'

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.DOMAIN_URL_APP
    : `http://localhost:${process.env.PORT}`;


const read = async (req, res) => {
  try {
    const { page = 1, species, size, age } = req.query;
    const isPageValid = /^[1-9]\d*$/.test(page);
    const filters = { page: Number(page), };
    if (species) filters.species = species;
    if (size) filters.size = size;
    if (age) filters.age = age;

    if (!isPageValid) {
      return res.status(400).json({ message: "Invalid page number, page > 0" });
    }


    const pets = await petModel.findAllPets(filters);
    return res.status(200).json(pets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const readById = async (req, res) => {

  const petId = req.params.id;
  const userId = req.user?.id || null;

  try {
    const pet = await petModel.findById(petId);

    if (!pet) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }

    // Verificación: ¿Es el dueño?
    const isOwner = userId && pet.author_post === userId;

    return res.status(200).json({
      ...pet,
      isOwner,
      href: `${BASE_URL}/api/pets/${pet.id}`,
    });
  } catch (error) {
    console.error('Error en readById:', error);
    return res.status(500).json({ message: 'Error al obtener la mascota' });
  }
};


const readByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const myPets = await petModel.findByUser(userId);
    return res.status(200).json({
      count: myPets.length,
      results: myPets,
    });
  } catch (error) {
    console.error('Error en readByUser:', error);
    return res.status(500).json({ message: 'Error al obtener mascotas del usuario' });
  }
};


//crear la mascota
const create = async (req, res) => {
  const { name, specie, weight, age, gender, chip, description } = req.body;
  const photo = req.file ? req.file.filename : null;
  const userId = req.user.id

  if (!name || !specie || !weight || !age || !gender || !chip || !photo || !description) {
    return res.status(400).json({ message: "Faltan campos requeridos" });
  }

  const petData = {
    name,
    specie,
    weight: Number(weight),
    age: Number(age),
    gender,
    chip,
    photo: photo ? `../uploads/${photo}` : null,
    description,
  };

  try {
    const newPet = await petModel.create(petData, userId);
    return res.status(201).json(newPet);;
  } catch (error) {
    return res.status(500).json({ message: "Errorx en el servidor" });
  }

};

const update = async (req, res) => {
  const petId = req.params.id;
  const userId = req.user.id;
  const updatedFields = req.body;

  try {
    //Verificar si existe la mascota
    const pet = await petModel.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }

    //Verificar propiedad
    if (pet.author_post !== userId) {
      return res.status(403).json({ message: 'No tienes permiso para editar esta publicación' });
    }

    //Actualizar la mascota
    const updatedPet = await petModel.update(petId, userId, updatedFields);

    return res.status(200).json({
      message: 'Mascota actualizada con éxito',
      pet: updatedPet
    });
  } catch (error) {
    console.error('Error al actualizar mascota:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};


const remove = async (req, res) => {
  const petId = req.params.id;
  const userRole = req.user.role;

  console.log('Petición DELETE recibida para ID:', petId);

  try {
    // Verificar si la mascota existe
    const pet = await petModel.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }

    // Verificar si el usuario es el dueño
    if (userRole !== "administrador") {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta publicación' });
    }

    try {
      
      const filePath = `../uploads/${pet.photo}`;
      await fs.unlink(filePath);
      console.log(`Foto eliminada: ${pet.photo}`);
    } catch (error) {
      console.error('Error al eliminar la foto:', error.message);
    }

    // Eliminar la mascota
    const deletedPet = await petModel.remove(petId);

    return res.status(200).json({
      message: 'Mascota eliminada con éxito',
      pet: deletedPet
    });
  } catch (error) {
    console.error('Error al eliminar mascota:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const petController = {
  read,
  readById,
  create,
  update,
  remove,
  readByUser
};
