import Select from 'react-select'
import { useUeas } from '../context/UeaContext'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ListCorrUea from '../components/ListCorrUea';

function UeaCor(){

    const {ueas, loadUeasC, createUeaCorr, CorrUeas} = useUeas();
    const [ueasC, setUeas] = useState([]);
    const [ueasSele, setUeasSel] = useState({
        Clave:""
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const loadUeasCor = async() =>{
            await loadUeasC();
            setUeas(ueas)
        }
        loadUeasCor();
    },[loadUeasC])

    const UeasFil = ueasC.filter(uea => uea.Clave!== params.id);

    const UeasRes = UeasFil.filter(uea =>
        !CorrUeas.some(corr => corr.Clave === uea.Clave)
    )

    const ListaUeas = UeasRes.map(uea =>{
        return{
            value: uea.Clave,
            label: uea.Clave+'-'+uea.Nombre,
        }
    })

    const createRelacion = async(ueas) =>
    {
        await createUeaCorr(params.id, ueas);
        navigate(`/ueas`)
    }

    return(
        <div>
            <ListCorrUea Clave={params.id}/>
            <div className="bg-blanco border-rojo-uam border-2 max-w-md rounded-md p-4 mx-auto my-32">
                <h1 className="text-xl text-negro font-bold text-center">Seriación de UEAs</h1>
                <Select
                className="text-negro rounded-md w-full"
                isMulti
                options={ListaUeas}
                Name="UeasC"
                closeMenuOnSelect={false}
                noOptionsMessage={() => "No hay UEAs"}
                onChange={(ueasSel) => {
                    console.log(ueasSel)
                    const ueaL = ueasSel.map(uea => {return {Clave: uea.value, Nombre:uea.label}})
                    setUeasSel(ueaL)
                    }}
                ></Select>
                <div className='flex gap-52'>
                    <button className="block bg-rojo-uam px-3 py-1 text-blanco rounded-md mt-2"
                    onClick={() => {createRelacion(ueasSele)}}>Registrar</button>
                    <button className="block bg-rojo-uam px-3 py-1 text-blanco rounded-md mt-2"
                    onClick={() => navigate("/ueas")}>
                    Cancelar
                    </button>
                </div>
                
            </div>
            
        </div>
    )
}

export default UeaCor