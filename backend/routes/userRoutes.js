import { Router } from "express";
import { generateBackendToken, GetAllFavPet, toggleFavPet } from "../controllers/userController.js";
// import  upload  from "../middlewares/upload.js";
const router = Router();

router.post('/auth/exchange', generateBackendToken);
router.post('/fav/toggle',toggleFavPet);
router.get('/favPet/:userId', GetAllFavPet);

export default router;