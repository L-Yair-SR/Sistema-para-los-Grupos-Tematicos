import { useNavigate } from "react-router-dom";


function UeaPeCard({uea}){

    const navigate = useNavigate();

    return(
        <div className="bg-blanco border-rojo-uam  border-2 rounded-md p-3 mr-10 ml-5 text-center">
            <h2 className="text-lg font-bold">{uea.Nombre} - {uea.Clave}</h2>
            <div className="flex">
                <button className="botonuea flex-1" onClick={() => navigate(`/programaSin/${uea.Clave}`)}>Sintetico</button>
                <button className="botonuea flex-1" onClick={() => navigate(`/programaAn/${uea.Clave}`)}>Analítico</button>
            </div>
        </div>
    )
}

export default UeaPeCard;