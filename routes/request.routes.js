import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requestController } from '../controllers/request.controller.js';

const router = Router()


 router.get("/",authMiddleware,);


 router.get("/:id", authMiddleware)



 router.post("/",authMiddleware,)



 router.put("/:id",authMiddleware,requestController.updateStatus)



 router.delete("/:id",authMiddleware, requestController.deleteRequest )



 export default router;