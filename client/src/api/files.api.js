import Axios from 'axios';
import { URL, PORT } from './config';

export const uploadFileRequest = (id, file) =>{
    return Axios.post(`${URL}:${PORT}/files/${id}`, file);
}