import { userController } from "../controllers/user.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import { Router } from "express";





const userRouter = Router();

//registra el usuario
userRouter.post("/register", userController.register);

//login usuario

userRouter.post("/login", userController.login);

//leer por medio del ID
userRouter.get("/",authMiddleware, userController.readById);



userRouter.get("/:id", userController.create);


//actualizar el usuario
userRouter.put("/:id",authMiddleware, userController.update);



export default userRouter;