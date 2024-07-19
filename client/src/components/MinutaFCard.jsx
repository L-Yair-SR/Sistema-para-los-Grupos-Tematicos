function MinutaFCard({ minuta }) {

    return(
        <div className="bg-blanco border-rojo-uam  border-2 rounded-md p-3 mr-10 ml-5 text-center">
            <h2 className="text-2xl font-bold">{minuta.id} - {minuta.Asunto}</h2>
            <h2 className="text-lg font-bold">Fecha: {minuta.Fecha}</h2>
            <h2 className="text-lg font-bold">Hora de Inicio: {minuta.HoraIni} - Hora de Finalización: {minuta.HoraTer}</h2>
            <h2 className="text-lg font-bold">Lugar: {minuta.Lugar} - Objetivo: {minuta.Objetivo}</h2>
        </div>
    ) 
}

export default MinutaFCard