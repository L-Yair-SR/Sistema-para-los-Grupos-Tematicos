import { useEffect, useState } from "react"
import { useGts } from "../context/GtContext"
import UeaCorrCard from "./UeaCorrCard"

function ListUeaGt({Clave}) {
    
    const {ueasGt, loadUeasGt, getGt} = useGts();
    const [gt, setGt] = useState([]);

    useEffect(() =>{
        const loadueas = async () =>{
            await loadUeasGt(Clave);
            const response = await getGt(Clave);
            setGt(response[0])
        }
        loadueas();
    },[]);

    function renderMain(){
        if(ueasGt.lenght !== 0 ) return ueasGt.map((uea, index) =>(<UeaCorrCard uea={uea} key={index}/>))
        return <h1>No hay UEAS en el Grupo Tematico</h1>
    }

    return(
        <div>
            <h1 className='text-5xl font-bold text-center p-4'>UEAs del Grupo Tematico {gt.GrupoTematico}</h1>
            <div className='grid grid-cols-4 gap-4'>
                {renderMain()}
            </div>
        </div>
    )


}

export default ListUeaGt