import { useEffect } from "react";
import { useSint } from "../context/SintContext";
import { useLogin } from "../context/LoginContext";

function ListTemas({uea}){

    const {token} = useLogin();
    const {temas, getTemario, deleteTema} = useSint();

    useEffect(()=>{
        const loadTemas = async() =>{
            await getTemario(uea);
        }
        loadTemas()
    },[])

    function renderMain(){
        if(temas.length === 0){
            return <h1>No hay Temas para la UEA</h1>
        }else{
            if (!token || token.role != 2){
                return(
                    temas.map((tema, index) => <li key={index}>{tema.Nombre}</li>)
                )               
            }else{
                return(
                    temas.map((tema, index) => <li key={index}>{tema.Nombre} <button className="bg-rojo-uam px-2 -py-1 text-blanco rounded-full mt-2 font-bold" 
                    onClick={() => deleteTema(tema.id)}>-</button></li>)
                )
            }
        } 
    }

    return(
        <div className="bg-blanco border-rojo-uam  border-2 rounded-md p-2 mr-8 ml-2">
            <ol className=" list-decimal p-1 ml-2 list-inside text-center">
                {renderMain()}
            </ol>
        </div>
    )
}

export default ListTemas;