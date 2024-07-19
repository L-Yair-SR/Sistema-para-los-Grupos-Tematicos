import { useEffect } from "react";
import { useLogin } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";


function Home()
{
    const{token, deleteLogin} = useLogin();
    const navigate = useNavigate();

    useEffect(()=>{
        if (token) {
            console.log(token);
            if(!token.role){
                console.log("Es nulo")
                deleteLogin();
                navigate("/");
                location.reload();
            }
        }
    },[])

    if (!token) {
        return(
            <div className="text-3xl font-bold text-center p-5">
                <h1>Pagina Principal del Sistema de Grupos Tematicos</h1>
            </div>
        )
    } if (token.role == 1) {
        return(
            <div className="text-3xl font-bold text-center p-4">
                <h1>Pagina Principal del Administrador del Sistema de Grupos Tematicos</h1>
                <h1 className="p-5">Bienvenid@ {token.nombre}</h1>
            </div>
        )
    } if (token.role == 2) {
        return(
            <div className="text-3xl font-bold text-center p-4">
                <h1>Pagina Principal del Coordinador del Sistema de Grupos Tematicos</h1>
                <h1 className="p-5">Bienvenid@ {token.nombre}</h1>
            </div>
        )
    }
    if (token.role == 3) {
        return(
            <div className="text-3xl font-bold text-center p-4">
                <h1>Pagina Principal del Profesor del Sistema de Grupos Tematicos</h1>
                <h1 className="p-5">Bienvenid@ {token.nombre}</h1>
            </div>
        )
    }  
}

export default Home