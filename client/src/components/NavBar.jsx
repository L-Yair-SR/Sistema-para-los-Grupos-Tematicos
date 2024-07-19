import { Link } from "react-router-dom";
import { useLogin } from "../context/LoginContext";

function NavBar() {

    const{token} = useLogin();

    if (!token) {
        return(
            <div className="text-center p-1 text-blanco">
                <h1 className="absolute text-lg font-bold border-b-4"> Sistema de Grupos Tematicos</h1>
                <ul>
                    <li className="absolute font-bold p-2 left-20 top-16 text-lg hover:underline hover:underline-offset-4 hover:decoration-4">
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li className="absolute font-bold p-2 left-4 top-28 text-lg hover:underline hover:underline-offset-4 hover:decoration-4">
                        <Link to={"/programas"}>Programas de Estudio</Link>
                    </li>
                    <li className="absolute left-0 bottom-5 border-t-4 w-56 font-bold text-xl hover:underline hover:underline-offset-4 hover:decoration-4">
                        <Link to={'/login'}>Login</Link>
                    </li>
                </ul>
            </div>
        )
    } if(token.role == 1){
        return(
            <div className="text-center p-1 text-blanco">
                <h1 className="text-lg font-bold border-b-4"> Sistema de Grupos Tematicos</h1>
                <ul>
                    <li className="font-bold p-3 hover:underline hover:underline-offset-4 hover:decoration-4">
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li className="font-bold p-3 hover:underline hover:underline-offset-4 hover:decoration-4">
                        <Link to={"/profesores"}>Profesores</Link>
                    </li>
                    <li className="font-bold p-3 hover:underline hover:underline-offset-4 hover:decoration-4">
                        <Link to={"/ueas"}>UEAs</Link>
                    </li>
                    <li className="font-bold p-3 hover:underline hover:underline-offset-4 hover:decoration-4">
                        <Link to={'/gts'}>Grupos Tematicos</Link>
                    </li>
                    <li className="absolute left-0 bottom-5 border-t-4 w-56 font-bold text-xl hover:underline hover:underline-offset-4 hover:decoration-4">
                        <Link to={"/logout"}>logout</Link>
                    </li>
                </ul>
            </div>
        )
    } if(token.role == 2){
        return(
            <div className="text-center p-1 text-blanco">
                <h1 className="text-lg font-bold border-b-4"> Sistema de Grupos Tematicos</h1>
                <ul>
                    <li className="font-bold p-3 left-1 top-10 text-lg hover:underline hover:underline-offset-4 hover:decoration-4">
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li className="font-bold p-3 left-1 top-24 text-lg hover:underline hover:underline-offset-4 hover:decoration-4">
                        <Link to={"/minuta"}>Minutas</Link>
                    </li>
                    <li className="font-bold p-3 left-1 top-40 text-lg hover:underline hover:underline-offset-4 hover:decoration-4">
                        <Link to={"/programas"}>Programas de estudio</Link>
                    </li>
                    <li className="absolute left-0 bottom-5 border-t-4 w-56 font-bold text-xl hover:underline hover:underline-offset-4 hover:decoration-4">
                        <Link to={"/logout"}>Logout</Link>
                    </li>
                </ul>
            </div>
        )
    }
    if(token.role == 3){
        return(
            <div className="text-center p-1 text-blanco">
                <h1 className="text-lg font-bold border-b-4"> Sistema de Grupos Tematicos</h1>
                <ul>
                    <li className="font-bold p-3 left-1 top-10 text-lg hover:underline hover:underline-offset-4 hover:decoration-4">
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li className="font-bold p-3 left-1 top-24 text-lg hover:underline hover:underline-offset-4 hover:decoration-4">
                        <Link to={"/minuta"}>Minutas</Link>
                    </li>
                    <li className="font-bold p-3 left-1 top-40 text-lg hover:underline hover:underline-offset-4 hover:decoration-4">
                        <Link to={"/programas"}>Programas de estudio</Link>
                    </li>
                    <li className="absolute left-0 bottom-5 border-t-4 w-56 font-bold text-xl hover:underline hover:underline-offset-4 hover:decoration-4">
                        <Link to={"/logout"}>Logout</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default NavBar