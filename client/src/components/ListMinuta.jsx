import { useEffect } from "react"
import MinutaCard from "./MinutaCard"
import { useMinutas } from "../context/MinutaContext"

function ListMinuta({gt, prof}) {
    const {minutas, getAllMinutas, getMinutasProf} = useMinutas();

    useEffect(()=>{
        if (gt && !prof) {
            getAllMinutas(gt);
            console.log(minutas)
        } else if(prof && !gt){
            getMinutasProf(prof)
            console.log(minutas)
        }
    }, []);

    function renderMain(){
        if(minutas.length === 0){
            return <h1>No hay minutas en la Base de Datos</h1>
        } else if (gt && !prof) {
            return minutas.map((minuta, index)=>(<MinutaCard minuta={minuta} key={index}/>));
        } else if (prof && !gt){
            return minutas.map((minuta, index)=>(<MinutaCard minuta={minuta} prof={prof} key={index}/>));
        }
    }

    return(
        <div>
            <h1 className='text-5xl font-bold text-center p-4'>Minutas</h1>
            <div className='grid grid-cols-4 gap-4'>
                {renderMain()}
            </div>
        </div>
    )
}

export default ListMinuta