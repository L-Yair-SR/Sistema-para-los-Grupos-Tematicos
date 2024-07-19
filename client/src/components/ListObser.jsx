import { useMinutas } from "../context/MinutaContext";
import { useEffect, useState } from 'react';

function ListObser({minuta}){
    
    const {getOneMinuta} = useMinutas();
    const [observacion, setObservacion] = useState([]);

    useEffect(() =>{
        const loadOneMinuta = async() =>{
            const response = await getOneMinuta(minuta);
            setObservacion(response.Observaciones.split(','));
        }
        loadOneMinuta();
    },[getOneMinuta, minuta])

    return(
        <div className="bg-blanco border-rojo-uam  border-2 rounded-md p-2 mr-10 ml-5 text-center">
            <ul>
            {observacion.map((obs, index) => <li key={index}>{obs}</li>)}
            </ul>
        </div>
    )
}

export default ListObser;