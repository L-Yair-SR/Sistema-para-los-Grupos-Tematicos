/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useState} from 'react'
import { uploadFileRequest } from "../api/files.api";
import { Toaster, toast } from 'sonner'

const FileContext = createContext();

export const useFile = () =>{
    const context = useContext(FileContext);
    if(!context)
    {
        throw new Error("useFile dberia de estar entre FileContextProvider");
    }
    return context;
}

export const FileContextProvider = ({ children }) =>{
    const [file, setFile] = useState([]);

    const uploadFile = (id, file) =>{
        const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));
        toast.promise(promise, {
            loading: 'Subiendo archivo...',
            success: () => {
              return `El archivo se subio con exito`;
            },
            error: 'Error',
          });
        const formData = new FormData();
        formData.append('firma', file);
        const response = uploadFileRequest(id, formData)
        console.log(response);
        setFile(file)
    }

    return(
        <FileContext.Provider value={{file,
        uploadFile}}>
            {children}
            <Toaster position="top-center" richColors/>
        </FileContext.Provider>
    )
}