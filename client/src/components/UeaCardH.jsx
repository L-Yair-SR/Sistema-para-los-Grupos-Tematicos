function UeaCardH({uea}){
    return(
        <div className="bg-blanco border-rojo-uam  border-2 rounded-md p-3 mr-10 ml-5 text-center">
            <h2 className="text-2xl font-bold">{uea.Nombre} - {uea.Clave}</h2>
            <h2 className="text-lg font-bold">Creditos: {uea.Creditos} - Tipo: {uea.Tipo}</h2>
            <h2 className="text-lg font-bold">Horas Teoricas: {uea.HorasTeo} - Horas Practica: {uea.HorasPra}</h2>
            <h2 className="text-lg font-bold">División: {uea.Division} - Unidad: {uea.Unidad}</h2>
        </div>
    )
}

export default UeaCardH;