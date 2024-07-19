import { useNavigate } from "react-router-dom";
import ListGt from "../components/ListGt";


function GtsPage(){

    const navigate = useNavigate();

    return(
        <div>
            <button className='bg-blanco border-rojo-uam border-4 -ml-4 mt-2 text-xl rounded-lg p-1 hover:bg-rojo-uam hover:text-blanco' onClick={()=> navigate('/newgts')}>Registrar</button>
            <ListGt></ListGt>
        </div>
    )
}

export default GtsPage;