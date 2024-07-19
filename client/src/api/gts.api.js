import Axios from 'axios';
import { URL, PORT } from './config';

export const getGtsRequest = async () =>{
    return await Axios.get(`${URL}:${PORT}/gts`);
}

export const createGtRequest = async (gt) =>{
    return await Axios.post(`${URL}:${PORT}/newGts`, gt);
}

export const deleteGtRequest = async(id) =>{
    return await Axios.delete(`${URL}:${PORT}/gts/${id}`);
}

export const getGTRequest = async (id) =>{
    return await Axios.get(`${URL}:${PORT}/gt/${id}`);
}

export const updateGtRequest = async(id, newGt) =>{
    return await Axios.put(`${URL}:${PORT}/gt/${id}`, newGt);
}

export const getUeasforGtRequest = async()=>{
    return await Axios.get(`${URL}:${PORT}/gtueas`);
}

export const addUeaGtRequest = async(id, Clave) =>{
    return await Axios.put(`${URL}:${PORT}/gtueas/${id}`, Clave);
}

export const deleteUeaGtRequest = async(id) =>{
    return await Axios.delete(`${URL}:${PORT}/gtueas/${id}`);
}

export const getAllUeasGtRequest = async(id) =>{
    return await Axios.get(`${URL}:${PORT}/ueasgt/${id}`);
}

export const getProfforGtRequest = async() =>{
    return await Axios.get(`${URL}:${PORT}/gtprof`);
}

export const addProfGtRequest = async(id, NoEconomico) =>{
    return await Axios.put(`${URL}:${PORT}/gtprof/${id}`, NoEconomico);
}

export const deleteProfGtRequest = async(id) =>{
    return await Axios.delete(`${URL}:${PORT}/gtprof/${id}`);
}

export const getAllProfsGtRequest = async(id) =>{
    return await Axios.get(`${URL}:${PORT}/profgt/${id}`);
}