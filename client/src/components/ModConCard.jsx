import { useEffect } from "react"
import { useSint } from "../context/SintContext"

function ModConCard({uea}) 
{
    const {modcons, getModCon} = useSint();
    
    useEffect(() =>{
        const loadModCon = async() =>{
            await getModCon(uea);
        }
        loadModCon()
    },[])

    function renderMain(){
        if(modcons.length !== 0)return <h1>{modcons[0].Descripcion}</h1>
            return <h1>No hay Modalidades de Conducción</h1> 
    }

    return(
        <div className="bg-blanco border-rojo-uam  border-2 rounded-md p-2 mr-8 ml-2">
            {renderMain()}
        </div>
    )    
}

export default ModConCard