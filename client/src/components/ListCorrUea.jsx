import { useEffect, useState } from "react"
import { useUeas } from "../context/UeaContext"
import UeaCorrCard from "./UeaCorrCard"
import { useLogin } from "../context/LoginContext";

function ListCorrUea({Clave}){

    const {CorrUeas, ueasPCorrs, loadCorrUea, getUea, getUeasPCorr} = useUeas();
    const {token} = useLogin();
    const [uea, setUea] = useState([]);

    useEffect(()=>{
        const loadCorr = async () =>{
            await loadCorrUea(Clave)
            await getUeasPCorr(Clave)
            const response = await getUea(Clave);
            setUea(response);
        }
        loadCorr();
    },[]);

    function renderMain(){
        if(CorrUeas.lenght === 0) return <h1>No hay UEAS Correlacionadas</h1>
        return CorrUeas.map((ueac, index) =>(<UeaCorrCard uea={ueac} oruea={uea.Clave} key={index}/>))
    }

    function renderSub(){
        if(ueasPCorrs.lenght === 0) return <h1>No hay UEAS Correlacionadas</h1>
        return ueasPCorrs.map((ueac, index) =>(<UeaCorrCard uea={ueac} oruea={1} key={index}/>))
    }

    if(token && token.role==1){
        return(
            <div>
                <h1 className='text-5xl font-bold text-center p-4'>Seriación de UEA&apos;s</h1>
                <h1 className='text-4xl font-bold text-center p-4'>{uea.Nombre}-{uea.Clave}</h1>
                <h1 className='text-3xl font-bold text-center p-4'>Ueas que son prerequisito</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {renderMain()}
                </div>
                <h1 className='text-3xl font-bold text-center p-4'>Ueas que en las que se es prerequisito</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {renderSub()}
                </div>
            </div>
        )
    }else{
        return(
            <div>
                <div className='grid grid-cols-3 gap-4'>
                    {renderMain()}
                </div>
            </div>
        )
    }
}

export default ListCorrUea