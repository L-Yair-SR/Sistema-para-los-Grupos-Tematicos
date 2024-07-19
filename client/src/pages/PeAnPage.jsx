import { useUeas } from "../context/UeaContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UeaCardH from "../components/UeaCardH";
import ListCorrUea from "../components/ListCorrUea";
import ListObj from "../components/ListObj";
import ListTemasAn from "../components/ListTemasAn";
import ModConCard from "../components/ModConCard";
import ModEvaCard from "../components/ModEvaCard";
import ListBiblio from "../components/ListBiblio";
import { usePdf } from "../context/PdfContext";

function PeAnPage(){

    const params = useParams();
    const navigate = useNavigate();

    const {getUea} = useUeas();
    const {downloadPdfAnalitico} = usePdf();

    const [uea, setUea] = useState([]);

    useEffect( () => {
        const loadUea = async()=>{
            const result = await getUea(params.id)
            setUea(result);
        }
        loadUea();
    },[getUea, params.id])

    

    return(
        <div>
            <div className='flex gap-10'>
                <button className='bg-blanco border-rojo-uam border-4 -ml-4 mt-2 text-xl rounded-lg p-1 hover:bg-rojo-uam hover:text-blanco'
                onClick={() => navigate("/programas")}>Cancelar
                </button>
                <button className='bg-blanco border-rojo-uam border-4 -ml-4 mt-2 text-xl rounded-lg p-1 flex flex-nowrap hover:bg-rojo-uam hover:text-blanco'
                onClick={() => downloadPdfAnalitico(params.id)}>
                <object data="../documento.svg" className="size-8 fill-white hover:stroke-white" type=""></object>
                <p className=" align-middle">Generar PDF</p>
                </button>
            </div>
            <h1 className='text-3xl font-bold text-center p-4'>Programa Analítico de la UEA {uea.Nombre}</h1>
            <UeaCardH uea={uea}/>
            <h1 className='text-2xl font-bold text-center p-4'>Seriación</h1>
            <ListCorrUea Clave={params.id}/>
            <h1 className='text-2xl font-bold text-center p-4'>Objetivos</h1>
            <ListObj uea={params.id} an={params.id}/>
            <h2 className='text-2xl font-bold text-center p-4'>Contenido Desglosado</h2>
            <ListTemasAn uea={params.id}/>
            <h2 className='text-2xl font-bold text-center p-4'>Modalidades de Conducción</h2>
            <ModConCard uea={params.id}/>
            <h2 className='text-2xl font-bold text-center p-4'>Modalidades de Evaluación</h2>
            <ModEvaCard uea={params.id}/>
            <h2 className='text-2xl font-bold text-center p-4'>Bibliografia</h2>
            <ListBiblio uea={params.id} an={params.id}/>
        </div>
    )
}

export default PeAnPage;