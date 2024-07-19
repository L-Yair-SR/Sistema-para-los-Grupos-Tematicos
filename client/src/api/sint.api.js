import Axios from 'axios';
import { URL, PORT } from './config';

export const getObjetivosRequest = async(id) =>{
    return await Axios.get(`${URL}:${PORT}/objetivos/${id}`);
}

export const updateObjetivosRequest = async(id, objetivos) =>{
    return await Axios.put(`${URL}:${PORT}/objetivos/${id}`, objetivos)
}

export const deleteObjetivoRequest = async(id, objetivos) =>{
    return await Axios.post(`${URL}:${PORT}/objetivos/${id}`, objetivos);
}

export const getTemarioRequest = async(id) =>{
    return await Axios.get(`${URL}:${PORT}/temario/${id}`);
}

export const makeTemarioRequest = async(id, tema)=>{
    return await Axios.post(`${URL}:${PORT}/temario/${id}`, tema)
}

export const deleteTemaRequest = async(id) =>{
    return await Axios.delete(`${URL}:${PORT}/temario/${id}`)
}

export const getModConRequest = async(id) =>{
    return await Axios.get(`${URL}:${PORT}/modcon/${id}`)
}

export const makeModConRequest = async(id, modcon) =>{
    return await Axios.post(`${URL}:${PORT}/modcon/${id}`, modcon);
}

export const getModEvaRequest = async(id) =>{
    return await Axios.get(`${URL}:${PORT}/modeva/${id}`)
}

export const updateModEvaRequest = async(id, evalu) =>{
    return await Axios.put(`${URL}:${PORT}/modeva/${id}`, evalu);
}

export const getBibliRequest = async(id) =>{
    return await Axios.get(`${URL}:${PORT}/bibli/${id}`)
}

export const makeBibliRequest = async(id, biblio) =>{
    return await Axios.post(`${URL}:${PORT}/bibli/${id}`, biblio)
}

export const deleteBibliRequest = async(id) =>{
    return await Axios.delete(`${URL}:${PORT}/bibli/${id}`)
}

export const getSubTemasRequest = async(clave, id) =>{
    return await Axios.get(`${URL}:${PORT}/subtemario/${clave}/${id}`)
}

export const makeSubTemaRequest = async(clave, id, subtema) =>{
    return await Axios.post(`${URL}:${PORT}/subtemario/${clave}/${id}`, subtema)
}

export const deleteSubTemaRequest = async(id) =>{
    return await Axios.delete(`${URL}:${PORT}/subtemario/${id}`);
}