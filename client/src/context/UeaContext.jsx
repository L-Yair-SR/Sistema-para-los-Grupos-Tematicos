import { createContext, useContext, useState } from "react";
import { Toaster, toast } from 'sonner'
import { 
    getUeaRequest, 
    deleteUeaRequest, 
    getOneUeaRequest, 
    updateUeaRequest, 
    createUeaRequest,
    getUeasCRequest,
    createUeaCorrRequest,
    getCorrUeaRequest,
    getUeasGTRequest,
    deleteCorrUeaRequest,
    getUeasPCorrRequest } from "../api/ueas.api";

const UeaContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUeas = () =>{
    const context = useContext(UeaContext);
    if(!context)
    {
        throw new Error("useUeas deberia de estar entre UeaContextProvider");
    }
    return context;
}

export const UeaContextProvider = ({ children }) =>{

    const [ueas, setUeas] = useState([]);
    const [CorrUeas, setCorrUeas] = useState([]);
    const [ueasPCorrs, setUeasPCorrs] = useState([]);

    async function loadUeas()
    {
        const response = await getUeaRequest()
        setUeas(response.data);
    }

    const deleteUea = async(id) =>{
        try {
            const response = await deleteUeaRequest(id);
            setUeas(ueas.filter(uea => uea.Clave !== id))
            return response.data; 
        } catch (error) {
            console.error(error);
        }
    }

    const getUea = async (id) =>{
        try {
            const response = await getOneUeaRequest(id);
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    const updateUea = async (id, newFields) =>{
        try {
            const response = await updateUeaRequest(id, newFields);
            console.log(response);
            toast.success('Se actualizo correctamente la UEA');
        } catch (error) {
            toast.error('Ocurrio un error al actualizar la UEA')
            console.error(error);
        }
    }

    const createUea = async (uea) =>{
        try {
            const response = await createUeaRequest(uea);
            console.log("Datos a Crear");
            console.log(response);
            console.log(response.data);
            toast.success('Se registro correctamente la UEA');
            setUeas([...ueas, response.data]);
        } catch (error) {
            toast.error('Ocurrio un error al registrar la UEA')
            console.log(error);
        }
    }

    async function loadUeasC()
    {
        const response = await getUeasCRequest();
        setUeas(response.data);
    }

    const createUeaCorr = async(id, ueas) =>
    {
        ueas.map(uea => {
            try {
                const response = createUeaCorrRequest(id, uea);
                console.log(response);
                setCorrUeas([...CorrUeas, uea])
                toast.success('Se registraron correctamente las UEA');
            } catch (error) {
                toast.error('Ocurrio un error al registrar las UEA')
                console.error(error);
            }
        })
    }

    const loadCorrUea = async(Clave) =>{
        try {
            const response = await getCorrUeaRequest(Clave);
            setCorrUeas(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function loadUeasGT(id)
    {
        const response = await getUeasGTRequest(id)
        setUeas(response.data);
    }

    const deleteCorrUea = async(clave, ueac) =>{
        try {
            const response = await deleteCorrUeaRequest(clave, ueac)
            console.log(response)
            setCorrUeas(CorrUeas.filter(cuea => cuea.Clave !== ueac))
        } catch (error) {
            console.error(error);
        }      
    }

    const getUeasPCorr = async(id) =>{
        try {
            const response = await getUeasPCorrRequest(id)
            setUeasPCorrs(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    return(
    <UeaContext.Provider value={
        {ueas, CorrUeas, ueasPCorrs,    
        loadUeas, 
        deleteUea, 
        getUea, 
        updateUea, 
        createUea, 
        loadUeasC,
        createUeaCorr,
        loadCorrUea,
        loadUeasGT,
        deleteCorrUea,
        getUeasPCorr}}>
        {children}
        <Toaster position="top-center" richColors/>
    </UeaContext.Provider>
    );
};