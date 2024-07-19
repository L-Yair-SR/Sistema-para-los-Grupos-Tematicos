import { useEffect, useState } from "react";
import { useSint } from "../context/SintContext";
import { useLogin } from "../context/LoginContext";

function ListObj({uea, an}){


    const {token} = useLogin();
    const {objetivos, getObjetivos, deleteObjetivos} = useSint();
    const [objs, setObjs] = useState([]);

    useEffect(() =>{
        const loadObj = async() =>{
            await getObjetivos(uea);
            if (objetivos.Descripcion) {
                setObjs(objetivos.Descripcion.split('/'))
            } else{
                setObjs([])
            }
        }
        loadObj();    
    },[getObjetivos, objetivos.Descripcion, uea])
    
    function borrarObj(ob){
        const obf = objs.filter(obj => obj != ob)
        deleteObjetivos(uea, {
            Objetivos: obf.join('/')
        });
    }
    if (token){
        if (token.role == 2 && !an) {
            return(
                <div className="bg-blanco border-rojo-uam  border-2 rounded-md p-2 mr-10 ml-5 text-center">
                    <ul>
                        {objs.map((obj, index) => <li key={index}>{obj} <button className="bg-rojo-uam px-2 -py-1 text-blanco rounded-full mt-2 font-bold" 
                        onClick={()=>borrarObj(obj)}>-</button></li>)}
                    </ul>
                </div>
            )
        } 
        if(token.role == 2 && an){
            return(
                <div className="bg-blanco border-rojo-uam  border-2 rounded-md p-2 mr-10 ml-5 text-center">
                    <ul>
                        {objs.map((obj, index) => <li key={index}>{obj}</li>)}
                    </ul>
                </div>
            )
        }
    }
    if (!token || token.role != 2) {
        return(
            <div className="bg-blanco border-rojo-uam  border-2 rounded-md p-2 mr-10 ml-5 text-center">
                <ul>
                    {objs.map((obj, index) => <li key={index}>{obj}</li>)}
                </ul>
            </div>
        )
    }
}

export default ListObj;