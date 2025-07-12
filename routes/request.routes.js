import { authMiddleware } from "../middlewares/auth.middleware";
import { Router } from "express";

const router = Router()


 router.get("/",authMiddleware,);


 router.get("/:id", )



 router.post("/",authMiddleware,)



 router.put("/:id",authMiddleware,)



 router.delete("/:id",authMiddleware,  )



 export default router;