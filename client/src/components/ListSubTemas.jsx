import { useEffect, useState } from "react";
import { useSint } from "../context/SintContext";
import { useLogin } from "../context/LoginContext";

function ListSubTemas({clave, id}) {
    
    const {getSubTemas, makeSubTema, deleteSubTema} = useSint();
    const {token} = useLogin();

    const [temas, setTemas] = useState([]);
    const [subtemas, setSubtemas] = useState({
        Nombre:""
    });
    
    useEffect(() => {
        const loadSubTemas = async() =>{
            const response = await getSubTemas(clave, id);
            setTemas(response)
        }
        loadSubTemas();
    },[])


    function handleChangeSub(event){
        setSubtemas({
            Nombre: event.target.value
        })
    }

    function makeSubTemas(clave, id, subtema){
        const response = makeSubTema(clave, id, subtema);
        setTemas([...temas,response]);
        setSubtemas({
            Nombre: ""
        })  
    }

    function renderFormSubTema(){
        if(token)
            if (token.role == 2) {
                return(
                    <div className="bg-blanco border-rojo-uam border-2 max-w-3xl mx-auto rounded-md p-4 mt-2">
                        <h1 className="text-xl text-negro font-bold text-center p-1">Agregar Tema</h1>
                        <input className="text-negro rounded-md w-full p-1 mt-1"
                        type="text" 
                        id={id + "Tema"}
                        value={subtemas.Nombre}
                        onChange={handleChangeSub}/>
                        <button className="block bg-rojo-uam px-3 py-1 text-blanco text-lg rounded-full mt-2  font-bold"
                        type="submit" onClick={() => makeSubTemas(clave, id, subtemas)}>+</button>
                    </div>
                )
            }
    }

    function renderMain(){
        if(temas)
            if (temas.length === 0) {
                return <h1>No hay Subtemas</h1>
            }else{
                if(!token || token.role !=2){
                    return(temas.map((sub, index) => 
                        <li key={index}>{sub.Nombre}</li>  
                    ))
                }else{
                    return(temas.map((sub, index) => 
                        <li key={index}>{sub.Nombre}
                        <button className="bg-rojo-uam px-2 -py-1 text-blanco rounded-full mt-2 font-bold" 
                        onClick={() => {
                            deleteSubTema(sub.id)
                            setTemas(temas.filter(tem => tem.id !== sub.id))}}>-</button>
                        </li>  
                    ))
                }   
            }
    }

    return(
        <div>
            <div className="bg-blanco border-rojo-uam  border-2 rounded-md p-2 mr-8 ml-2">
                <ol className=" list-decimal p-1 ml-2 list-inside text-center">
                    {renderMain()}
                </ol>
            </div>
            <div>
                {renderFormSubTema()}
            </div>
        </div>
        
    )
}

export default ListSubTemas;