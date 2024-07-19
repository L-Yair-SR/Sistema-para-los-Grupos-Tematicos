import { useEffect } from "react";
import { useUeas } from "../context/UeaContext"
import UeaCard from "./UeaCard";

function ListUEA(){
    
    const {ueas, loadUeas} = useUeas();

    useEffect(()=>{
        const loadU = () =>{
            loadUeas()
        }
        loadU()
    }, []);

    function renderMain(){
        if(ueas.lenght === 0) return <h1>No hay UEAS en la base de datos</h1>
        return ueas.map((uea, index)=>(
        <div key={index}>
            <UeaCard uea={uea} key={index}/>
        </div>))
    }

    return(
        <div>
            <h1 className='text-5xl font-bold text-center p-4'>UEAs</h1>
            <div className='grid grid-cols-4 gap-4'>
                {renderMain()}
            </div>
        </div>
    )
}

export default ListUEA