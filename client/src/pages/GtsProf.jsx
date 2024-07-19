import Select from 'react-select'
import { useGts } from '../context/GtContext';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ListProfGt from '../components/ListProfGt';

function GtsProf() 
{

    const params = useParams();
    const navigate = useNavigate();
    
    const {Profs, getProffroGt, addProfGt} = useGts();
    const [profSele, setProfSele] = useState({
        NoEconomico:""
    })

    useEffect(() =>{
        const loadProfs = async() =>{
            await getProffroGt();
        }
        loadProfs();
    },[getProffroGt])

    const ListProf = Profs.map(prof =>{
        return{
            value: prof.NoEconomico,
            label: prof.NoEconomico+'-'+prof.Nombre
        }
    })

    const addProfs = async(profs) =>{
        await addProfGt(params.id, profs)
        navigate("/gts")
    }

   return(
    <div>
        <ListProfGt Clave={params.id}/>
        <div>
            <h1 className="text-xl text-negro font-bold text-center">Agregar Profesores</h1>
            <Select
            isMulti
            options={ListProf}
            closeMenuOnSelect={false}
            noOptionsMessage={() => "No hay Profesores"}
            onChange={(profsSele) =>{
                const profL = profsSele.map(prof =>{return {NoEconomico:prof.value}})
                setProfSele(profL)
            }}/>
            <div>
                <button className="block bg-rojo-uam px-3 py-1 text-blanco rounded-md mt-2"
                onClick={() => {addProfs(profSele)}}>Añadir</button>
                <button className="block bg-rojo-uam px-3 py-1 text-blanco rounded-md mt-2"
                onClick={() => navigate("/gts")}>
                    Cancelar
                </button>
            </div>
        </div>
    </div>
   ) 
}

export default GtsProf