import { Router } from "express";
import { createPdf,
    createPdfSin,
    createPdfAnali
 } from "../controller/pdf.controller.js";

const router = Router();

router.get('/pdf/:id', createPdf);

router.get('/pdfSin/:id', createPdfSin);

router.get('/pdfAnali/:id', createPdfAnali);

export default router;