import { authMiddleware } from "../middlewares/auth.middleware.js";
import { petController } from "../controllers/pet.controller.js";
import { Router } from "express";

const router = Router()


//obtener todas las mascotas  
 router.get("/", authMiddleware ,petController.read);
router.get("/", authMiddleware, petController.read);


//Obtener mascotas por ID
 router.get("/:id",authMiddleware, petController.readById)



//Crear una mascota
router.post("/", authMiddleware, petController.create)



//actualizar mascotas
router.put("/:id", authMiddleware, petController.update)



//eliminar mascotas
router.delete("/:id", authMiddleware, petController.remove)



export default router;