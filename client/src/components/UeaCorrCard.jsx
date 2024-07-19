import { useGts } from "../context/GtContext";
import { useLogin } from "../context/LoginContext";
import { useUeas } from "../context/UeaContext";

function UeaCorrCard({ uea, oruea }){

    const {deleteUeaGt} = useGts();
    const {deleteCorrUea} = useUeas();
    const {token} = useLogin();

    if(token && token.role==1 && !oruea){
        return(
            <div className="bg-blanco border-rojo-uam  border-2 rounded-md p-3 mr-10 ml-5 text-center">
                <ul>
                    <li className="text-lg font-bold">{uea.Clave+"-"+uea.Nombre}</li>
                </ul>
                <div className="flex">
                    <button className="boton flex-1" onClick={() => deleteUeaGt(uea.Clave)}>Borrar</button>
                </div>
            </div>
        );  
    }else if((token && token.role==1 && oruea !==1)){
        return(
            <div className="bg-blanco border-rojo-uam  border-2 rounded-md p-3 mr-10 ml-5 text-center">
                <ul>
                    <li className="text-lg font-bold">{uea.Clave+"-"+uea.Nombre}</li>
                </ul>
                <div className="flex">
                    <button className="boton flex-1" onClick={() => deleteCorrUea(oruea,uea.Clave)}>Borrar</button>
                </div>
            </div>
        ); 
    }else{
        return(
            <div className="bg-blanco border-rojo-uam  border-2 rounded-md p-3 mr-10 ml-5 text-center">
                <ul>
                    <li className="text-lg font-bold">{uea.Clave+"-"+uea.Nombre}</li>
                </ul>
            </div>
        ); 
    } 
}

export default UeaCorrCard