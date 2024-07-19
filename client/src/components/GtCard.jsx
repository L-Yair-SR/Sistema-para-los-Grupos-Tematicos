import { useGts } from "../context/GtContext"
import { useNavigate } from "react-router-dom";

function GtCard({ gt }){

    const {deleteGt} = useGts();
    const navigate = useNavigate();

    return(
        <div className="bg-blanco border-rojo-uam relative  border-2 rounded-md p-3 mr-10 ml-5 text-center">
            <button className="bg-blanco text-negro font-bold border-rojo-uam border-4 rounded-full absolute -top-3 -left-2 p-1 hover:bg-rojo-uam hover:text-blanco" 
                onClick={() => deleteGt(gt.id)}>X</button>
            <h2 className="text-lg font-bold">{gt.GrupoTematico}</h2>
            <h2>{gt.Coordinador}</h2>
            <div className="flex">
                <button className="botongt flex-1" onClick={() => navigate(`/editgt/${gt.id}`)}>Actualizar</button>
                <button className="botongt flex-1" onClick={() => navigate(`/gtueas/${gt.id}`)}>UEAs</button>
                <button className="botongt flex-1" onClick={() => navigate(`/gtprofs/${gt.id}`)}>Profesores</button>
            </div>
        </div>       
    )
}

export default GtCard;