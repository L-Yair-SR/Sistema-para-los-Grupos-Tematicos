import { useEffect } from "react";
import { useSint } from "../context/SintContext";
import ListSubTemas from "./ListSubTemas";

function ListTemasAn({uea}){
    
    const {temas, getTemario} = useSint();

    
    useEffect(()=>{
        const loadTemas = async() =>{
            await getTemario(uea);
        }
        loadTemas()
    },[getTemario, uea])

    function rendrMain(){
        if(temas.length === 0){
            return <h1>No hay Temas para la UEA</h1>
        }else{
            return(
                temas.map((tema, index) => 
                <div key={index}>
                    <li key={index} className='text-2xl font-bold text-center p-4'>{tema.Nombre}</li>
                    <ListSubTemas clave={uea} id={tema.id}/>
                </div> 
                )
            ) 
        }
    }

    return(
        <div>
            <ol className=" list-decimal p-1 ml-2 list-inside text-center">
                {rendrMain()}
            </ol>
        </div>
    )
}

export default ListTemasAn;