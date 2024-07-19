/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useState} from 'react'
import { Toaster, toast } from 'sonner'
import { createPdfRequest,
    createPDFSinteticoRequest,
    createPDFAnaliticoRequest
 } from "../api/pdf.api";
import download from 'downloadjs';

const PdfContext = createContext();

export const usePdf = () =>{
    const context = useContext(PdfContext);
    if(!context)
    {
        throw new Error("usePdf dberia de estar entre PdfContextProvider");
    }
    return context;
}

export const PdfContextProvider = ({children}) =>{
    const [pdf] = useState([]);

    const downloadPdf = async (id) =>{
        const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 4000));
        toast.promise(promise, {
            loading: 'Creando PDF...',
            success: () => {
              return `El pdf (Minuta-${id}.pdf) se creo con exito`;
            },
            error: 'Error',
          });
        const response = await createPdfRequest(id);
        console.log(response)
        download(response.data, `Minuta-${id}.pdf`, 'application/pdf');
    }

    const downloadPdfSintetico = async (id) =>{
        const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 4000));
        toast.promise(promise, {
            loading: 'Creando PDF...',
            success: () => {
              return `El pdf (${id}-ProgramaSintetico.pdf) se creo con exito`;
            },
            error: 'Error',
          });
        const response = await createPDFSinteticoRequest(id);
        console.log(response)
        download(response.data, `${id}-ProgramaSintetico.pdf`, 'application/pdf');
    }

    const downloadPdfAnalitico = async (id) =>{
        const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 4000));
        toast.promise(promise, {
            loading: 'Creando PDF...',
            success: () => {
              return `El pdf (${id}-ProgramaAnalitico.pdf) se creo con exito`;
            },
            error: 'Error',
          });
        const response = await createPDFAnaliticoRequest(id);
        console.log(response)
        download(response.data, `${id}-ProgramaAnalitico.pdf`, 'application/pdf');
    }

    return(
        <PdfContext.Provider value={{pdf,
        downloadPdf,
        downloadPdfSintetico,
        downloadPdfAnalitico}}>
            {children}
            <Toaster position="top-center" richColors/>
        </PdfContext.Provider>
    )
}