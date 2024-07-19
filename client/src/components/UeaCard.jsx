import { useUeas } from "../context/UeaContext";
import { useNavigate } from "react-router-dom";

function UeaCard({ uea })
{

    const {deleteUea} = useUeas();
    const navigate = useNavigate();


    return(
        <div className="bg-blanco border-rojo-uam relative  border-2 rounded-md p-3 mr-10 ml-5 text-center">
            <button className="bg-blanco text-negro font-bold border-rojo-uam border-4 rounded-full absolute -top-3 -left-2 p-1 hover:bg-rojo-uam hover:text-blanco" 
                onClick={() => deleteUea(uea.Clave)}>X</button>
            <h2 className="text-lg font-bold">{uea.Nombre} - {uea.Clave}</h2>
            <h2></h2>
            <h2>Creditos: {uea.Creditos} Tipo: {uea.Tipo}</h2>
            <h2>Horas Teoricas: {uea.HorasTeo} Horas Practicas: {uea.HorasPra}</h2>
            <div className="flex">
                <button className="botonuea flex-1" onClick={() => navigate(`/editUea/${uea.Clave}`)}>Actualizar</button>
                <button className="botonuea flex-1" onClick={() => navigate(`/UeaCor/${uea.Clave}`)}>Correlacion</button>
            </div>
        </div>
    );
}

export default UeaCard;