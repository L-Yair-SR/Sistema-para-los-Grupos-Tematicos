import { useGts } from "../context/GtContext";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";

function ListProfGt({Clave}) {
    
    const{ProfsGt, loadProsfGt, getGt} = useGts();
    const [gt, setGt] = useState([]);

    useEffect(() =>{
        const loadprofs = async () =>{
            await loadProsfGt(Clave);
            const response = await getGt(Clave);
            setGt(response[0])
        }
        loadprofs();
    },[]);

    function renderMain(){
        if(ProfsGt.lenght !== 0 ) return ProfsGt.map((prof, index) =>(<TaskCard task={prof} gt={gt.id} key={index}/>))
        return <h1>No hay Profesores en el Grupo Tematico</h1>
    }

    return(
        <div>
            <h1 className='text-5xl font-bold text-center p-4'>Profesores del Grupo Tematico {gt.GrupoTematico}</h1>
            <div className='grid grid-cols-4 gap-4'>
                {renderMain()}
            </div>
        </div>
    )
}

export default ListProfGt;