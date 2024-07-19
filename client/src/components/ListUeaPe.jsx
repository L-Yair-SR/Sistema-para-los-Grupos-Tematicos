import { useEffect } from "react";
import { useUeas } from "../context/UeaContext"
import { useLogin } from "../context/LoginContext";
import UeaPeCard from "./UeaPeCard";

function ListUeaPe(){
    
    const {ueas, loadUeas, loadUeasGT} = useUeas();
    const {token} = useLogin();

    useEffect(()=>{
        if (!token || token.gt == null) {
            const loadu = () =>{
                loadUeas();
            }
            loadu();
        }else {
            const loadugt = () =>{
                loadUeasGT(token.gt);
            }
             loadugt();
        }    
    },[])
    
    function renderMain(){
        if(ueas.lenght === 0) return <h1>No hay UEAS en la base de datos</h1>
        return ueas.map((uea, index)=>(
        <div key={index}>
            <UeaPeCard uea={uea} key={index}/>
        </div>))
    }

    return(
        <div>
            <h1 className='text-5xl font-bold text-center p-4'>Programas de estudios de la UEA&apos;S</h1>
            <div className='grid grid-cols-4 gap-4'>
                {renderMain()}
            </div>
        </div>
    )
}

export default ListUeaPe