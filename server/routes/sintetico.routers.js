import { Router } from "express";
import { getObjetivos,
        makeObjetivos,
        deleteObjetivos,
        getTemario,
        makeTema,
        deleteTema,
        getModCon,
        makeModCon,
        getModEva,
        updateModEva,
        getBibli,
        makeBibli,
        deleteBibli,
        getSubTemas,
        makeSubTema,
        deleteSubTema
 } from "../controller/sintetico.controller.js";

const router = Router();

router.get('/objetivos/:id', getObjetivos);

router.put('/objetivos/:id', makeObjetivos);

router.post('/objetivos/:id', deleteObjetivos);

router.get('/temario/:id', getTemario);

router.post('/temario/:id',makeTema);

router.delete('/temario/:id', deleteTema);

router.get('/modcon/:id', getModCon);

router.post('/modcon/:id', makeModCon);

router.get('/modeva/:id', getModEva);

router.put('/modeva/:id', updateModEva);

router.get('/bibli/:id', getBibli);

router.post('/bibli/:id', makeBibli);

router.delete('/bibli/:id', deleteBibli);

router.get('/subtemario/:clave/:id', getSubTemas);

router.post('/subtemario/:clave/:id', makeSubTema);

router.delete('/subtemario/:id', deleteSubTema);

export default router;
