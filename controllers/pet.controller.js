import { petModel } from "../models/pet.model.js";

//lo que se vera en la pagina
const read = async (req, res) => {
  const { limit = 8, order = "ASC", page = 1 } = req.query;
  const isPageValid = /^[1-9]\d*$/.test(page);

  if (!isPageValid) {
    return res.status(400).json({ message: "Invalid page number, page > 0" });
  }

  try {
    const pets = await petModel.findAll({
      limit,
      order,
      page,
      user: req.user,
    });
    return res.json(pets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//leer las mascotas por medio del ID
const readById = async (req, res) => {
  const { id } = req.params;

  try {
    const pet = await petModel.findById(id);
    if (!pet) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }
    return res.json(pet);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//crear la mascota
const create = async (req, res) => {
  const { name, breed, age, gender, chip, photo, description } = req.body;

  if (!name || !breed || age || !gender || !chip || !photo || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newPet = {
    name,
    breed,
    age,
    gender,
    chip,
    photo,
    description,
  };

  try {
    const createdPet = await petModel.create(newPet);
    return res.status(201).json(createdPet);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//actualizar perfil de la mascota
const update = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedPet = await petModel.update(id, updateData);
    if (!updatedPet) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }
    return res.json(updatedPet);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

//eliminar mascota
const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPet = await petModel.remove(id);
    if (!deletedPet) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }
    return res.json({ message: "Mascota eliminada" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const petController = {
  read,
  readById,
  create,
  update,
  remove,
};
