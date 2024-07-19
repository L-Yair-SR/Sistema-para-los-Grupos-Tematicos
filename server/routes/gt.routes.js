import { Router } from "express";
import { 
    getGts,
    createGt,
    deleteGt,
    getGt,
    updateGt,
    getUeaGT,
    addUeaGt,
    deleteUeaGt,
    getAllGtUea,
    getProfGT,
    addProfGt,
    deleteProfGt,
    getAllGtProf 
} from "../controller/gt.controller.js";

const router = Router();

router.get('/gts', getGts);

router.post('/newGts', createGt);

router.delete('/gts/:id', deleteGt);

router.get('/gt/:id', getGt);

router.put('/gt/:id', updateGt);

router.get('/gtueas', getUeaGT);

router.put('/gtueas/:id', addUeaGt);

router.delete('/gtueas/:id', deleteUeaGt);

router.get('/ueasgt/:id', getAllGtUea);

router.get('/gtprof', getProfGT);

router.put('/gtprof/:id', addProfGt);

router.delete('/gtprof/:id', deleteProfGt);

router.get('/profgt/:id', getAllGtProf);

export default router;