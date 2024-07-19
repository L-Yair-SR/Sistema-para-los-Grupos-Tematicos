import { Router } from "express";
import {
    getTask,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskSel
} from '../controller/tasks.controllers.js'

const router = Router();

router.get('/tasks', getTasks)

router.get('/tasks/:id', getTask)

router.post('/tasks', createTask)

router.put('/tasks/:id', updateTask)

router.delete('/tasks/:id', deleteTask)

router.get('/tasksel', getTaskSel)

export default router;