import { petModel } from "../models/pet.model.js";


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
    const pet = await findById(petId);

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


//mostrar usuarios que el publico
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
  const { name, specie, weight, age, gender, chip, photo, description, author_post } = req.body;

  if (!name || !specie || !weight || !age || !gender || !chip || !photo || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newPet = {
    name,
    specie,
    weight,
    age,
    gender,
    chip,
    photo,
    description,
    author_post: req.user.id
  };

  try {
    const createdPet = await petModel.create(newPet);
    return res.status(201).json(createdPet);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
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
  readByUser
};
