import BibliCard from "./BibliCard";
import { useSint } from "../context/SintContext";
import { useEffect } from "react";

function ListBiblio({uea, an}){

    const {biblio, getBiblio} = useSint()

    useEffect(() =>{
        const loadBiblio = async()=>{
            await getBiblio(uea);
        }
        loadBiblio()
    },[])

    function renderBiblio(){
        if(biblio.length === 0) return <h1>No hay Bibliografia en la Base de Datos</h1>
        return biblio.map((bib, index) =>(<BibliCard biblio={bib} an={an} key={index}/>));
    }

    return(
        <div className='grid grid-cols-3 gap-3'>
            {renderBiblio()}
        </div>
    )
}

export default ListBiblio