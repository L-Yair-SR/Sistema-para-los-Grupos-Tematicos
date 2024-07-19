import { createContext, useContext } from "react";
import { useState } from "react";
import { getObjetivosRequest,
    updateObjetivosRequest,
    deleteObjetivoRequest,
    getTemarioRequest,
    makeTemarioRequest,
    deleteTemaRequest,
    getModConRequest,
    makeModConRequest,
    getModEvaRequest,
    updateModEvaRequest,
    getBibliRequest,
    makeBibliRequest,
    deleteBibliRequest,
    getSubTemasRequest,
    makeSubTemaRequest,
    deleteSubTemaRequest
 } from "../api/sint.api";

const SintContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSint = () =>{
    const context = useContext(SintContext);
    if(!context){
        throw new Error("UseSint dberia de estar entre SintContextProvider");
    }
    return context;
}

export const SintContextProvider = ({ children }) =>{

    const [objetivos, setObjetivos] = useState([]);
    const [temas, setTemas] = useState([]);
    const [subtemas, setSubTemas] = useState([]);
    const [modcons, setModCons] = useState([]);
    const [evaluaciones, setEvaluaciones] = useState([]);
    const [biblio, setBiblio] = useState([]);

    const getObjetivos = async (id) =>{
        try {
            const response = await getObjetivosRequest(id);
            setObjetivos(response.data);
        } catch (error) {
            console.error(error)
            setObjetivos([]);
        }
    }

    const updateObjetivos = async(id, values) =>{
        try {
            const response = await updateObjetivosRequest(id, values)
            setObjetivos([...objetivos, response.data])
        } catch (error) {
            console.log(error)
            setObjetivos([]);
        }
    }

    const deleteObjetivos = async(id,values) =>{
        try {
            await deleteObjetivoRequest(id, values);
            setObjetivos(values);
        } catch (error) {
            console.error(error)
        }
    }

    const getTemario = async(id) =>{
        try {
            const response = await getTemarioRequest(id);
            setTemas(response.data);
        } catch (error) {
            console.error(error)
        }
    }

    const makeTemario = async(id, tema) =>{
        try {
            const response = await makeTemarioRequest(id, tema);
            setTemas([...temas, response.data]);
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTema = async(id) =>{
        try {
            await deleteTemaRequest(id);
            setTemas(temas.filter(tema => tema.id != id));
        } catch (error) {
            console.log(error)
        }
    }

    const getModCon = async(id) =>{
        try {
            const response = await getModConRequest(id);
            setModCons(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    const makeModCon = async(id, modcon) =>{
        try {
            const response = await makeModConRequest(id, modcon);
            setModCons([...modcons, response.data]);
        } catch (error) {
            console.log(error)
        }
    }

    const getModEva = async(id) =>{
        try {
            const response = await getModEvaRequest(id);
            setEvaluaciones(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    const updateModEva = async(id, evalu) =>{
        try {
            const response = await updateModEvaRequest(id, evalu);
            setEvaluaciones([...evaluaciones, response.data]);
        } catch (error) {
            console.log(error)
        }
    }

    const getBiblio = async(id) =>{
        try {
            const response = await getBibliRequest(id);
            setBiblio(response.data);
        } catch (error) {
            console.log(error)
            setBiblio([])
        }
    }

    const makeBiblio = async(id, biblio) =>{
        try {
            const response = await makeBibliRequest(id, biblio);
            setBiblio(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    const deleteBiblio = async(id) =>{
        try {
            await deleteBibliRequest(id);
            setBiblio(biblio.filter(bib => bib.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    const getSubTemas = async(clave, id) =>{
        try {
            const response = await getSubTemasRequest(clave, id);
            setSubTemas(response.data)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const makeSubTema = async(clave, id, subtema) =>{
        try {
            const response = await makeSubTemaRequest(clave, id, subtema)
            setSubTemas(response.data);
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const deleteSubTema = async(id) =>{
        try {
            await deleteSubTemaRequest(id);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <SintContext.Provider value={{objetivos, temas, subtemas, modcons, evaluaciones, biblio,
            getObjetivos,
            updateObjetivos,
            deleteObjetivos,
            getTemario,
            makeTemario,
            deleteTema,
            getModCon,
            makeModCon,
            getModEva,
            updateModEva,
            getBiblio,
            makeBiblio,
            deleteBiblio,
            getSubTemas,
            makeSubTema,
            deleteSubTema
        }}>
            {children}
        </SintContext.Provider>
    );

}