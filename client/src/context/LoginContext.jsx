import { createContext, useContext } from "react";
import { useState} from 'react'
import { getLoginRequest } from "../api/login.api";
import { Toaster, toast } from 'sonner'

const LoginContext = createContext();

export const useLogin = () =>{
    const context = useContext(LoginContext);
    if(!context){
        throw new Error("useLogin dberia de estar entre TaskContextProvider");
    }
    return context;
}

export const LoginContextProvider = ({ children }) =>{
    const [token, setToken] = useState(localStorage.getItem('token'));

    const makeLogin = async(fields) =>{
        try {
            const response = await getLoginRequest(fields);
            console.log(response.data);
            setToken({
                user:response.data.user,
                role:response.data.role,
                gt: response.data.gt,
                nombre: response.data.nombre,
                token:response.data.acsessToken 
            });
            localStorage.setItem('token',token);
            toast.success('Inicio de sesion exitoso');
            return 200;
        } catch (error) {
            toast.error('Usuario y/o Contraseña incorrecta')
            return error.response.status;
        }
    }

    const deleteLogin = () =>{
        setToken({
            user:"",
            role:"",
            token:"" 
        });
        localStorage.removeItem('token');
    }

    return(
        <LoginContext.Provider value={{
            token,
            makeLogin,
            deleteLogin
        }}>
            {children}
            <Toaster position="top-center" richColors/>
        </LoginContext.Provider>
    );

};