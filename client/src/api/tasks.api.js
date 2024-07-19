import Axios from 'axios';
import { URL, PORT } from './config';


export const getTaskRequest = async () =>{
    return await Axios.get(`${URL}:${PORT}/tasks`);
}

export const createTaskRequest = async (task) =>{
    return await Axios.post(`${URL}:${PORT}/tasks`, task)
}

export const deleteTaskRequest = async (id) =>{
    return await Axios.delete(`${URL}:${PORT}/tasks/${id}`);
}

export const getOneTaskRequest = async (id) =>
{
    return await Axios.get(`${URL}:${PORT}/tasks/${id}`);
}

export const updateTaskRequest = async (id, newFields) =>
{
    return await Axios.put(`${URL}:${PORT}/tasks/${id}`, newFields);
}

export const getTaskSelRequest = async () =>{
    return await Axios.get(`${URL}:${PORT}/tasksel`);
}