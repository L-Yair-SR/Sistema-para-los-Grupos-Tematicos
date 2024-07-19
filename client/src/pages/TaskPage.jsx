import ListTask from '../components/ListTask';
import { useEffect } from "react";
import { useLogin } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";


function TaskPage() {

    const navigate = useNavigate();
    const{token, deleteLogin} = useLogin();

    useEffect(()=>{
        if (token) {
            console.log(token);
            if(!token.role){
                console.log("Es nulo")
                deleteLogin();
                navigate("/");
                location.reload();
            }
        }
    },[])

    return(
        <div>
            <button className='bg-blanco border-rojo-uam border-4 -ml-4 mt-2 text-xl rounded-lg p-1 hover:bg-rojo-uam hover:text-blanco' onClick={() => navigate('/new')}>Registrar</button>
            <ListTask/>
        </div>
    )
}

export default TaskPage