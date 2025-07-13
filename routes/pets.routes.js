import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authOptionalMiddleware } from "../middlewares/authOptional.middleware.js";
import { petController } from "../controllers/pet.controller.js";
import { Router } from "express";

const router = Router()

//obtener todas las mascotas  
router.get("/", petController.read);

//Obtener mascotas por ID
router.get("/:id", authOptionalMiddleware, petController.readById)

//Obtener por medio del usuario
router.get("/myPets", authMiddleware, petController.readByUser)

//Crear una mascota
router.post("/", authMiddleware, petController.create)

//actualizar mascotas   
router.patch('/:id', authMiddleware, petController.update);

//eliminar mascotas
router.delete("/:id", authMiddleware, petController.remove)

export default router;