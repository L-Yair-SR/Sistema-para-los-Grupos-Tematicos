import { createContext, useContext, useState } from "react";
import { Toaster, toast } from 'sonner'
import { 
    getGtsRequest,
    createGtRequest,
    getGTRequest,
    updateGtRequest,
    getUeasforGtRequest,
    addUeaGtRequest,
    deleteUeaGtRequest,
    getAllUeasGtRequest,
    getProfforGtRequest,
    addProfGtRequest,
    deleteProfGtRequest,
    getAllProfsGtRequest,
    deleteGtRequest 
} from "../api/gts.api";

const GtContext = createContext();

export const useGts = () =>{
    const context = useContext(GtContext);
    if(!context){
        throw new Error("useGts deberia de estar entre GtContextProvider");
    }
    return context;
}

export const GtContextProvider = ({ children }) =>
{
    const [gts, setGts] = useState([]);
    const [ueas, setUeas] = useState([]);
    const [ueasGt, setUeasGt] = useState([]);
    const [Profs, setProfs] = useState([]);
    const [ProfsGt, setProfsGt] = useState([]);

    async function loadGts(){
        const response = await getGtsRequest();
        setGts(response.data)
    }

    const createGT = async (gt) =>{
        try {
            const response = await createGtRequest(gt);
            console.log(response);
            setGts([...gts, response.data]);
            toast.success('Se registro correctamente el grupo temático');
        } catch (error) {
            toast.error('Ocurrio un error al registrar el grupo temático')
            console.error(error);
        }
    }

    const getGt = async(id) =>{
        try {
            const response = await getGTRequest(id);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const deleteGt = async(id) =>{
        try{
            const response = await deleteGtRequest(id);
            setGts(gts.filter(gt => gt.id !== id));
            console.log(response);
        } catch(error){
            toast.error('Verifique que el grupo temático no tenga minutas');
            console.error(error);
        }
    }

    const updateGt = async(id, newGt) =>{
        try {
            const response = await updateGtRequest(id, newGt);
            console.log(response);
            toast.success('Se actualizo correctamente el grupo temático');
        } catch (error) {
            toast.error('Ocurrio un error al actualizar el grupo temático')
            console.error(error);
        }
    }

    const getUeasforGt = async() =>{
        try{
            const response = await getUeasforGtRequest();
            setUeas(response.data);
        } catch (error){
            console.error(error);
        }
    }

    const addUeaGt = async(id, ueas) =>{
        ueas.map(uea =>{
            try {
                const response = addUeaGtRequest(id, uea);
                console.log(response);
                setUeasGt([...ueasGt,uea]);
                toast.success('Se registro correctamente la UEA en el grupo temático');
            } catch (error) {
                toast.error('Hubo un error al registrar la UEA en el grupo temático');
                console.error(error);
            }
        })
    }

    const deleteUeaGt = async(id) =>{
        try {
            const response = await deleteUeaGtRequest(id);
            setUeasGt(ueasGt.filter(uea => uea.Clave !== id));
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    } 

    const loadUeasGt = async(Clave) =>{
        try {
            const response = await getAllUeasGtRequest(Clave);
            setUeasGt(response.data);
        } catch (error) {
            console.error(error);
            setUeasGt([]);
        }
    }

    const getProffroGt = async() =>{
        try {
            const response = await getProfforGtRequest();
            setProfs(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const addProfGt = async(id, profs) =>{
        profs.map(prof =>{
            try {
                const response = addProfGtRequest(id, prof);
                console.log(response);
                setProfsGt([...ProfsGt,prof])
                toast.success('Se registro correctamente el profesor en el grupo temático');
            } catch (error) {
                toast.error('Hubo un error al registrar el profesor en el grupo temático');
                console.error(error)
            }
        })
    }

    const deleteProfGt = async(id) =>{
        try {
            const response = await deleteProfGtRequest(id);
            setProfsGt(ProfsGt.filter(prof => prof.NoEconomico !== id));
            console.log(response);
        } catch (error) {
            console.error(error);
        }  
    }


    const loadProsfGt = async(Clave) =>{
        try {
            const response = await getAllProfsGtRequest(Clave);
            setProfsGt(response.data);
        } catch (error) {
            console.error(error);
            setProfsGt([]);
        }
    }

    return(
        <GtContext.Provider value={{ gts, ueas, ueasGt, Profs, ProfsGt, 
        loadGts,
        createGT,
        deleteGt,
        getGt,
        updateGt,
        getUeasforGt,
        addUeaGt,
        loadUeasGt,
        deleteUeaGt,
        getProffroGt,
        addProfGt,
        deleteProfGt,
        loadProsfGt}}>
            {children}
            <Toaster position="top-center" richColors/>
        </GtContext.Provider>
    );
};