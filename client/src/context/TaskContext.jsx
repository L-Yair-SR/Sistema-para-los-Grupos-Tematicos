/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { useState} from 'react'
import { getTaskRequest } from '../api/tasks.api';
import { Toaster, toast } from 'sonner'
import { 
    deleteTaskRequest, 
    getOneTaskRequest, 
    updateTaskRequest, 
    createTaskRequest,
    getTaskSelRequest } from "../api/tasks.api";

const TaskContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () =>
{
    const context = useContext(TaskContext);
    if(!context)
    {
        throw new Error("useTasks dberia de estar entre TaskContextProvider");
    }
    return context;
} 

export const TaskContextProvider = ({ children }) =>
{
    const [tasks, setTasks] = useState([]);

    async function loadTask()
        {
            const response = await getTaskRequest()
            setTasks(response.data)
        }

    const deleteTask = async(id) =>
    {
        try {
            const response = await deleteTaskRequest(id);
            setTasks(tasks.filter(task => task.NoEconomico !== id));
            console.log(response);
        } catch (error) {
            toast.error('El profesor no puede ser eliminado porque pertenece a un grupo tematico')
            console.error(error)
        }
    }

    const getTask = async (id) => {
        try {
            const response = await getOneTaskRequest(id);
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    const updateTask = async (id, newFields) =>
    {
        try {
            const response = await updateTaskRequest(id, newFields);
            console.log(response);
            toast.success('Se actualizo correctamente al profesor');
        } catch (error) {
            toast.error('Ocurrio un error al actualizar al profesor')
            console.error(error);
        }
    }

    const createTask = async (task) =>{
        try {
            const response = await createTaskRequest(task);
            console.log("Datos a Crear");
            console.log(response);
            console.log(response.data);
            setTasks([...tasks, response.data]);
            toast.success('Se registro correctamente al profesor');
        } catch (error) {
            toast.error('Ocurrio un error al registrar al profesor')
            console.log(error)
        }
    }

    const getTaskSel = async() =>{
        try {
            const response = await getTaskSelRequest();
            setTasks(response.data)
        } catch (error) {
            console.error(error);
        }
    }


    return (
    <TaskContext.Provider value={{ tasks, 
    loadTask, 
    deleteTask, 
    getTask, 
    updateTask, 
    createTask,
    getTaskSel }}>
        {children}
        <Toaster position="top-center" richColors/>
    </TaskContext.Provider>
    );
};