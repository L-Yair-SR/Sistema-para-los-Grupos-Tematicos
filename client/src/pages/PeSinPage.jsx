import UeaCardH from "../components/UeaCardH";
import { useUeas } from "../context/UeaContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ListCorrUea from "../components/ListCorrUea";
import ListObj from "../components/ListObj";
import { useSint } from "../context/SintContext";
import ListTemas from "../components/ListTemas";
import ModConCard from "../components/ModConCard";
import ModEvaCard from "../components/ModEvaCard";
import ListBiblio from "../components/ListBiblio";
import BiblioForm from "./BiblioForm";
import { usePdf } from "../context/PdfContext";
import { useLogin } from "../context/LoginContext";


function PeSinPage() {
    
    const params = useParams();
    const navigate = useNavigate();

    const {token} = useLogin();
    const {getUea} = useUeas();
    const {downloadPdfSintetico} = usePdf();
    const {updateObjetivos, makeTemario, makeModCon, updateModEva} = useSint();

    const [uea, setUea] = useState([]);
    const [obje, setObje] = useState([{
        Objetivos:""
    }])
    const [tem, setTem] = useState([{
        Nombre:""
    }])
    const [mc, setMc] = useState([{
        Descripcion:""
    }])
    const [eva, setEva] = useState([{
        Global:"",
        Recuperacion:""
    }])

    useEffect( () => {
        const loadUea = async()=>{
            const result = await getUea(params.id)
            setUea(result);
        }
        loadUea();
    },[getUea, params.id])

    function renderObjForm(){
        if(token)
            if (token.role == 2) {
                return(
                    <div className="bg-blanco border-rojo-uam border-2 max-w-3xl mx-auto rounded-md p-4 mt-2">
                        <h1 className="text-xl text-negro font-bold text-center p-1">Agregar Objetivo</h1>
                        <input className="text-negro rounded-md w-full p-1 mt-1"
                        type="text" 
                        name="Nombre"
                        value={obje.Objetivos}
                        onChange={handleChangeObj}/>
                        <button className="block bg-rojo-uam px-3 py-1 text-blanco text-lg rounded-full mt-2  font-bold"
                        type="submit" onClick={() => updateObje(uea.Clave, obje)}>+</button>
                    </div>
                )
            }
    }

    function renderTemarioForm(){
        if(token)
            if (token.role == 2) {
                return(
                    <div className="bg-blanco border-rojo-uam border-2 max-w-3xl mx-auto rounded-md p-4 mt-2">
                        <h1 className="text-xl text-negro font-bold text-center p-1">Agregar Tema</h1>
                        <input className="text-negro rounded-md w-full p-1 mt-1"
                        type="text" 
                        name="Tema"
                        value={tem.Nombre}
                        onChange={handleChangeTem}/>
                        <button className="block bg-rojo-uam px-3 py-1 text-blanco text-lg rounded-full mt-2  font-bold"
                        type="submit" onClick={() => makeTem(uea.Clave, tem)}>+</button>
                    </div>
                )
            }
    }

    function renderModConForm(){
        if(token)
            if (token.role == 2){
                return(
                    <div className="bg-blanco border-rojo-uam border-2 max-w-3xl mx-auto rounded-md p-4 mt-2">
                        <h1 className="text-xl text-negro font-bold text-center p-1">Agregar Modalidad de Conducción</h1>
                        <textarea className="text-negro  border-rojo-uam border-2 rounded-md w-full h-20 mt-2 resize"
                        name="modalidad"
                        value={mc.Descripcion}
                        onChange={handleText}></textarea>
                        <button className="block bg-rojo-uam px-3 py-1 text-blanco rounded-md mt-2"
                        type="submit" onClick={()=>makeMc(uea.Clave, mc)}>Agregar</button>
                    </div>
                )
            }
    }

    function renderModEvaForm(){
        if(token)
            if (token.role == 2){
                return(
                    <div className="grid grid-cols-2">
                        <div className="bg-blanco border-rojo-uam border-2 max-w-3xl mx-12 rounded-md p-4 mt-2">
                            <h1 className="text-xl text-negro font-bold text-center p-1">Agregar Evaluacion Global</h1>
                            <textarea className="text-negro  border-rojo-uam border-2 rounded-md w-full h-20 mt-2 resize"
                            name="global"
                            value={eva.Global}
                            onChange={handleGlo}></textarea>
                            <button className="block bg-rojo-uam px-3 py-1 text-blanco rounded-md mt-2"
                            type="submit" onClick={()=>makeGlo(uea.Clave, eva)}>Agregar</button>
                            </div>
                        <div>
                        <div className="bg-blanco border-rojo-uam border-2 max-w-3xl mx-12 rounded-md p-4 mt-2">
                            <h1 className="text-xl text-negro font-bold text-center p-1">Agregar Evaluacion de Recuperación</h1>
                            <textarea className="text-negro  border-rojo-uam border-2 rounded-md w-full h-20 mt-2 resize"
                            name="recuperacion"
                            value={eva.Recuperacion}
                            onChange={handleRec}></textarea>
                            <button className="block bg-rojo-uam px-3 py-1 text-blanco rounded-md mt-2"
                            type="submit" onClick={()=>makeRec(uea.Clave, eva)}>Agregar</button>
                            </div>
                        </div>
                    </div>
                )
            }
    }

    function handleChangeObj(event){
        setObje({
            Objetivos:event.target.value
        })
    }

    function handleChangeTem(event){
        setTem({
            Nombre:event.target.value
        })
    }

    function handleText(event){
        setMc({
            Descripcion:event.target.value
        })
    }

    function handleGlo(event){
        setEva({
            Global:event.target.value
        })
    }

    function handleRec(event){
        setEva({
            Recuperacion:event.target.value
        })
    }

    function updateObje(id, obje){
        console.log(obje);
        updateObjetivos(id, obje);
        setObje({
            Objetivos:""
        })
    }

    function makeTem(id, Tem){
        makeTemario(id, Tem);
        setTem({
            Nombre:""
        })
    }

    function makeMc(id, Mc){
        makeModCon(id, Mc);
        setMc({
            Descripcion:""
        })
    }

    function makeGlo(id, Glo){
        updateModEva(id, Glo);
        setEva({
            Global:""
        })
    }

    function makeRec(id, Rec){
        updateModEva(id, Rec);
        setEva({
            Recuperacion:""
        })
    }

    return(
        <div>
            <div className='flex gap-10'>
                <button className='bg-blanco border-rojo-uam border-4 -ml-4 mt-2 text-xl rounded-lg p-1 hover:bg-rojo-uam hover:text-blanco'
                onClick={() => navigate("/programas")}>Cancelar
                </button>
                <button className='bg-blanco border-rojo-uam border-4 -ml-4 mt-2 text-xl rounded-lg p-1 flex flex-nowrap hover:bg-rojo-uam hover:text-blanco'
                onClick={() => downloadPdfSintetico(params.id)}>
                    <object data="../documento.svg" className="size-8 fill-white hover:stroke-white"/>
                    <p className=" align-middle">Generar PDF</p>
                </button>
            </div>
            <h1 className='text-3xl font-bold text-center p-4'>Programa Sintetico de la UEA {uea.Nombre}</h1>
            <UeaCardH uea={uea}/>
            <h1 className='text-2xl font-bold text-center p-4'>Seriación</h1>
            <ListCorrUea Clave={params.id}/>
            <h1 className='text-2xl font-bold text-center p-4'>Objetivos</h1>
            <ListObj uea={params.id}/>
            {renderObjForm()}
            <h2 className='text-2xl font-bold text-center p-4'>Contenido Sintetico</h2>
            <ListTemas uea={params.id}/>
            {renderTemarioForm()}
            <h2 className='text-2xl font-bold text-center p-4'>Modalidades de Conducción</h2>
            <ModConCard uea={params.id}/>
            {renderModConForm()}
            <h2 className='text-2xl font-bold text-center p-4'>Modalidades de Evaluación</h2>
            <ModEvaCard uea={params.id}/>
            {renderModEvaForm()}
            <h2 className='text-2xl font-bold text-center p-4'>Bibliografia</h2>
            <ListBiblio uea={params.id}/>
            <BiblioForm uea={params.id}/>
        </div>
    )
}

export default PeSinPage;