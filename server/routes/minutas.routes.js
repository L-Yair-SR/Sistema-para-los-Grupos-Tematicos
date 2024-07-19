import { Router } from "express";
import { 
    getAllMinutas,
    createMinuta,
    createAgenda,
    getAllAgenda,
    deleteAgenda,
    getParticipante,
    updateAsistencia,
    getOneMinuta,
    getMinutasProf,
    deleteMinuta,
    updateMinuta,
    updateObservaciones 
} from "../controller/minuta.controller.js";


const router = Router();

router.get('/minutas/:id', getAllMinutas);

router.get('/minutasprof/:id', getMinutasProf);

router.get('/minuta/:id', getOneMinuta);

router.delete('/minuta/:id', deleteMinuta);

router.put('/minuta/:id', updateMinuta);

router.post('/newminuta', createMinuta);

router.post('/newagenda/:id', createAgenda);

router.get('/agenda/:id', getAllAgenda);

router.delete('/agenda/:id', deleteAgenda);

router.get('/participante/:id', getParticipante);

router.put('/participante/:id', updateAsistencia);

router.put('/observaciones/:id', updateObservaciones);

export default router;