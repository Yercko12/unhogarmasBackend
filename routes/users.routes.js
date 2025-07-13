import { userController } from "../controllers/user.controller";
import { Router } from "express";



const router = Router()

//registra el usuario
router.post("/register", userController.register);

//login usuario

router.post("/login", userController.login);

//leer por medio del ID
router.get("/",authMiddleware, userController.readById);



router.get("/:id", userController.create);


//actualizar el usuario
router.put("/:id",authMiddleware, userController.update);



export default userRouter;