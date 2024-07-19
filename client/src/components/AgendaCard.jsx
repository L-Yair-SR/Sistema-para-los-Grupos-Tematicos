import { useMinutas } from "../context/MinutaContext";

function AgendaCard({ agenda }){

    const {deleteAgenda} = useMinutas();
    
    const fecha = new Date(agenda.FechaCompromiso);
    
    const diaFormateadoUTC = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timeZone: 'America/Santiago'
      }).format(fecha);

    return(
        <div className="bg-blanco border-rojo-uam  border-2 rounded-md p-3 mr-10 ml-5 text-center">
            <h2 className="text-lg font-bold">{agenda.Tema}</h2>
            <h2>Responsable: {agenda.Responsable}</h2>
            <h2>Acuerdo: {agenda.Acuerdo}</h2>
            <h2>{diaFormateadoUTC}</h2>
            <div className="flex">
                <button className="botonuea flex-1" onClick={() => deleteAgenda(agenda.id)}>Borrar</button>
            </div>
        </div>
    )
}

export default AgendaCard;