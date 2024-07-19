import GtCard from "./GtCard"
import { useGts } from "../context/GtContext"
import { useEffect } from "react";

function ListGt(){

    const {gts, loadGts} = useGts();

    useEffect(() =>{
        loadGts()
    }, [loadGts]);

    function renderMain(){
        if(gts.length === 0) return <h1>No hay Grupos Tematicos en la base de datos</h1>
        return gts.map((gt, index) => (<GtCard gt={gt} key={index}/>))
    }

    return(
        <div>
            <h1 className='text-5xl font-bold text-center p-4'>Grupos Tematicos</h1>
            <div className='grid grid-cols-4 gap-4'>
                {renderMain()}
            </div>
        </div>
    )
}

export default ListGt