import { useEffect } from "react";
import { useSint } from "../context/SintContext"

function ModEvaCard({uea}) {

    const{evaluaciones, getModEva} = useSint();

    useEffect(() =>{
        const loadModEva = async() =>{
            await getModEva(uea);
        }
        loadModEva();
    },[])

    function renderGlobal(){
        if (evaluaciones.length === 0)  return <h1 className='text-lg text-center p-2'>No hay evaluacion global</h1>
        return <h1 className='text-lg text-center p-2'>{evaluaciones[0].Global}</h1>
    }   

    function renderRecuperacion(){
        if (evaluaciones.length === 0)  return <h1 className='text-lg text-center p-2'>No hay evaluacion de recuperacion</h1>
        return <h1 className='text-lg text-center p-2'>{evaluaciones[0].Recuperacion}</h1>
    }  

    return(
        <div className="grid grid-cols-2">
            <div className="bg-blanco border-rojo-uam  border-2 rounded-md p-2 mr-8 ml-2">
                <h1 className='text-xl font-bold text-center p-2'>Evaluacion Global</h1>
                {renderGlobal()}
            </div>
            <div className="bg-blanco border-rojo-uam  border-2 rounded-md p-2 mr-8 ml-2">
                <h1 className='text-xl font-bold text-center p-2'>Evaluacion de Recuperacion</h1>
                {renderRecuperacion()}
            </div>
        </div>
    )    
}

export default ModEvaCard