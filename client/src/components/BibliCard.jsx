import { useSint } from "../context/SintContext";
import { useLogin } from "../context/LoginContext";

function BibliCard({biblio, an}) {

    const {token} = useLogin();
    const {deleteBiblio} = useSint();

    if (!token || token.role != 2){
        return(
            <div className="bg-blanco border-rojo-uam  border-2 rounded-md p-3 mr-10 ml-5 text-center">
                <h2 className="text-lg font-bold">{biblio.Titulo}</h2>
                <h2>{biblio.Autor}</h2>
                <h2>{biblio.Descripcion}</h2>
            </div>
        )
    }else if(!an){
        return(
            <div className="bg-blanco border-rojo-uam  border-2 rounded-md p-3 mr-10 ml-5 text-center">
                <h2 className="text-lg font-bold">{biblio.Titulo}</h2>
                <h2>{biblio.Autor}</h2>
                <h2>{biblio.Descripcion}</h2>
                <div className="flex">
                    <button className="boton flex-1" onClick={() => deleteBiblio(biblio.id)}>Borrar</button>
                </div> 
            </div>
        )
    } else if(an){
        return(
            <div className="bg-blanco border-rojo-uam  border-2 rounded-md p-3 mr-10 ml-5 text-center">
                <h2 className="text-lg font-bold">{biblio.Titulo}</h2>
                <h2>{biblio.Autor}</h2>
                <h2>{biblio.Descripcion}</h2>
            </div>
        )
    }
      
}

export default BibliCard;