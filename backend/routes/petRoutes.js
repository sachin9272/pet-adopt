import { Router } from "express";
import { AddPet } from "../controllers/petController.js";
import  upload  from "../middlewares/upload.js";
const router = Router();

router.post('/add-pet', upload.single("petImage"), AddPet);

export default router;