import { Router } from "express";
import { generateBackendToken } from "../controllers/userController.js";
// import  upload  from "../middlewares/upload.js";
const router = Router();

router.post('/auth/exchange', generateBackendToken);

export default router;