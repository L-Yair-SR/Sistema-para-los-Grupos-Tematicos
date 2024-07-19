import Axios from 'axios';
import { URL, PORT } from './config';

export const getAllMinutaRequest = async (id) =>{
    return await Axios.get(`${URL}:${PORT}/minutas/${id}`);
}

export const getMinutasProfRequest = async (id) =>{
    return await Axios.get(`${URL}:${PORT}/minutasprof/${id}`);
}

export const getOneMinutaRequest = async (id) =>{
    return await Axios.get(`${URL}:${PORT}/minuta/${id}`);
}

export const createMinutaRequest = async(minuta) =>{
    return await Axios.post(`${URL}:${PORT}/newminuta`, minuta);
}

export const updateMinutaRequest = async(id, minuta) =>{
    return await Axios.put(`${URL}:${PORT}/minuta/${id}`, minuta);
}

export const deleteMinutaRequest = async (id) =>{
    return await Axios.delete(`${URL}:${PORT}/minuta/${id}`);
}

export const createAgendaRequest = async(id, agenda) =>{
    return await Axios.post(`${URL}:${PORT}/newagenda/${id}`, agenda);
}

export const getAllAgendaRequest = async(id) =>{
    return await Axios.get(`${URL}:${PORT}/agenda/${id}`);
}

export const deleteAgendaRequest = async(id) =>{
    return await Axios.delete(`${URL}:${PORT}/agenda/${id}`);
}

export const getParticipantesRequest = async(id) =>{
    return await Axios.get(`${URL}:${PORT}/participante/${id}`);
}

export const updateAsistenciaRequest= async(id, asis) =>{
    return await Axios.put(`${URL}:${PORT}/participante/${id}`, asis);
}

export const updateObservacionesRequest = async(id, observaciones) =>{
    return await Axios.put(`${URL}:${PORT}/observaciones/${id}`, observaciones);
}