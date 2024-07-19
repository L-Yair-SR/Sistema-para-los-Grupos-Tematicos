import { useEffect } from "react"
import AgendaCard from "./AgendaCard";
import { useMinutas } from "../context/MinutaContext"

function ListAgenda({minuta}){

    const {agendas, getAllAgenda} = useMinutas();

    useEffect(() =>{
        console.log(minuta)
        getAllAgenda(minuta);
    },[]);

    function renderMain(){
        if(agendas.length === 0) return <h1>No hay agenda en la Base de Datos para la minuta</h1>
        return agendas.map((agenda, index)=>(<AgendaCard agenda={agenda} key={index}/>));
    }

    return(
        <div>
            <h1 className='text-3xl font-bold text-center '>Agenda</h1>
            <div className="grid grid-cols-1 gap-3">{renderMain()}</div>
        </div>
    )
}

export default ListAgenda;