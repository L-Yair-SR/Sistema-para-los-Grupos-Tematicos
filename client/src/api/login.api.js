import Axios from 'axios';
import { URL, PORT } from './config';

export const getLoginRequest = async (fields) =>{
    return await Axios.post(`${URL}:${PORT}/login`, fields);
}

/*export const getLoginRequest = async (fields) =>{
    return await Axios.post("http://rohirrim.hopto.org:5174/login", fields)
}*/