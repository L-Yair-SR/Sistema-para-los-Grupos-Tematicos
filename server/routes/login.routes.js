import { Router } from "express";
import { 
    getUser 
} from "../controller/login.controller.js";

const router = Router();

router.post('/login', getUser);

export default router;