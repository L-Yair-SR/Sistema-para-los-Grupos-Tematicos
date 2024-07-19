import { Router } from "express";
import { 
    getUeas,
    getUea,
    createUea,
    updateUea,
    deleteUea,
    getUeaCor,
    createCorrelacion,
    getCorrUea,
    getAllGtUea,
    deleteUeaCorr,
    getUeasPCorr
 } from "../controller/ueas.controller.js";

const router = Router();

router.get('/ueas', getUeas);

router.get('/ueas/:id', getUea);

router.get('/ueasC', getUeaCor);

router.post('/ueas', createUea);

router.put('/ueas/:id', updateUea);

router.delete('/ueas/:id', deleteUea);

router.post('/ueasRe/:id', createCorrelacion);

router.get('/CorrUea/:id', getCorrUea);

router.get('/ueas-gt/:id', getAllGtUea);

router.get('/ueaspc/:id', getUeasPCorr);

router.delete('/ueasC/:clave/:ueac', deleteUeaCorr);

export default router;