import { userController } from "../controllers/user.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import { Router } from "express";





const userRouter = Router();

//registra el usuario
userRouter.post("/register", userController.register);

//login usuario

userRouter.post("/login", userController.login);

//mostrar mi usuario
userRouter.get("/me",authMiddleware, userController.getProfile);


//actualizar el usuario
userRouter.patch("/me",authMiddleware, userController.update);



export default userRouter;