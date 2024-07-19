import { useEffect } from "react";
import { useLogin } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

function Logout(){
    
    const {deleteLogin} = useLogin();
    const navigate = useNavigate();

    useEffect(() =>{
        deleteLogin();
        navigate("/");
        location.reload();
    },[deleteLogin, navigate]);


}

export default Logout;