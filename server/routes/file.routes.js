import multer from "multer";
import { Router } from "express";
import { 
    uploadFile,
    getFiles 
} from "../controller/file.controller.js";

const router = Router();
const upload = multer({ dest: 'firmas/'})

router.post('/files/:id', upload.single('firma'), uploadFile)
router.get('/files', getFiles);


export default router;