import Select from 'react-select'
import { useGts } from '../context/GtContext';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ListUeaGt from '../components/ListUeaGt';

function GtsUEAs(){

    const params = useParams();
    const navigate = useNavigate();

    const {ueas, getUeasforGt, addUeaGt} = useGts();
    const [ueasSele, setUeasSel] = useState({
        Clave:""
    });

    useEffect(() =>{
        const loadUeas = async () =>{
            await getUeasforGt();
        }
        loadUeas();
    },[getUeasforGt])

    const ListUeas = ueas.map(uea =>{
        return{
            value: uea.Clave,
            label: uea.Clave+'-'+uea.Nombre,
        }
    })

    const addUeas = async (ueas) =>{
        await addUeaGt(params.id, ueas);
        navigate("/gts")
    }

    return(
        <div>
            <ListUeaGt Clave={params.id}/>
            <div>
                <h1 className="text-xl text-negro font-bold text-center">Agregar UEA&apos;s</h1>
                <Select
                className="text-negro rounded-md w-full"
                isMulti
                options={ListUeas}
                closeMenuOnSelect={false}
                noOptionsMessage={() => "No hay UEAs"}
                onChange={(ueasSel) => {
                    console.log(ueasSel)
                    const ueaL = ueasSel.map(uea => {return {Clave: uea.value}})
                    setUeasSel(ueaL)
                    }}/>
                <div className=''>
                    <button className="block bg-rojo-uam px-3 py-1 text-blanco rounded-md mt-2"
                    onClick={() => {addUeas(ueasSele)}}>Añadir</button>
                    <button className="block bg-rojo-uam px-3 py-1 text-blanco rounded-md mt-2"
                    onClick={() => navigate("/gts")}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GtsUEAs