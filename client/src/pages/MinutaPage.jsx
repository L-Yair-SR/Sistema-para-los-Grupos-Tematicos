import ListMinuta from "../components/ListMinuta";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";

function MinutaPage(){
    
    const navigate = useNavigate();
    const {token} = useLogin();

    if (token.role == 2) {
        return(
            <div>
                <button className='bg-blanco border-rojo-uam border-4 -ml-4 mt-2 text-xl rounded-lg p-1 hover:bg-rojo-uam hover:text-blanco' onClick={() => navigate('/newminuta')}>Registrar</button>
                <ListMinuta gt={token.gt}/>
            </div>
        )
    } if (token.role == 3) {
        return(
            <div>
                <ListMinuta prof={token.user}/>
            </div>
        )
    }
    
}

export default MinutaPage