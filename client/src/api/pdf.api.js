import Axios from 'axios';
import { URL, PORT } from './config';

export const createPdfRequest = async (id) =>{
    return await Axios.get(`${URL}:${PORT}/pdf/${id}`,{
      responseType: "blob",
      headers: {
        'Accept': 'application/pdf',
        'Content-Type': 'application/json'
      }
    });
}

export const createPDFSinteticoRequest = async(id) =>{
  return await Axios.get(`${URL}:${PORT}/pdfSin/${id}`,{
    responseType: "blob",
    headers: {
      'Accept': 'application/pdf',
      'Content-Type': 'application/json'
    }
  });
}

export const createPDFAnaliticoRequest = async(id) =>{
  return await Axios.get(`${URL}:${PORT}/pdfAnali/${id}`,{
    responseType: "blob",
    headers: {
      'Accept': 'application/pdf',
      'Content-Type': 'application/json'
    }
  });
}