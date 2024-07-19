import Axios from 'axios';
import { URL, PORT } from './config';


export const getUeaRequest = async () =>{
    return await Axios.get(`${URL}:${PORT}/ueas`);
}

export const getOneUeaRequest = async (id) =>
{
    return await Axios.get(`${URL}:${PORT}/ueas/${id}`);
}

export const createUeaRequest = async (uea) =>{
    return await Axios.post(`${URL}:${PORT}/ueas`, uea);
}

export const updateUeaRequest = async(id, newFields) =>{
    return await Axios.put(`${URL}:${PORT}/ueas/${id}`, newFields);
}

export const deleteUeaRequest = async (id) =>{
    return await Axios.delete(`${URL}:${PORT}/ueas/${id}`);
}

export const getUeasCRequest = async() => {
    return await Axios.get(`${URL}:${PORT}/ueasC`);
}

export const createUeaCorrRequest = async(id, uea) =>{
    return await Axios.post(`${URL}:${PORT}/ueasRe/${id}`, uea);
}

export const getCorrUeaRequest = async(id) => {
    return await Axios.get(`${URL}:${PORT}/CorrUea/${id}`);
}

export const getUeasGTRequest = async(id) =>{
    return await Axios.get(`${URL}:${PORT}/ueas-gt/${id}`);
}

export const deleteCorrUeaRequest = async(clave, ueac) =>{
    return await Axios.delete(`${URL}:${PORT}/ueasC/${clave}/${ueac}`);
}

export const getUeasPCorrRequest = async(id) =>{
    return await Axios.get(`${URL}:${PORT}/ueaspc/${id}`)
}