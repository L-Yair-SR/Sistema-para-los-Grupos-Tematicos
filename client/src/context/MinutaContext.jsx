import { createContext, useContext } from "react";
import { useState} from 'react'
import { Toaster, toast } from 'sonner'
import { getAllMinutaRequest,
        createMinutaRequest,
        getAllAgendaRequest,
        createAgendaRequest,
        deleteAgendaRequest,
        getParticipantesRequest,
        updateAsistenciaRequest,
        getOneMinutaRequest,
        getMinutasProfRequest,
        deleteMinutaRequest,
        updateMinutaRequest,
        updateObservacionesRequest
     } from "../api/minuta.api";

const MinutaContext = createContext();

export const useMinutas = () =>{
    const context = useContext(MinutaContext);
    if(!context) 
    {
        throw new Error("useMinutas dberia de estar entre TaskContextProvider");
    }
    return context;
}

export const MinutaContextProvider = ({ children }) =>{
    const [minutas, setMinutas] = useState([]);
    const [agendas, setAgendas] = useState([]);
    const [participantes, setParticipantes] = useState([]);
    const [observaciones, setObservaciones] = useState([]);

    const getAllMinutas = async (id) =>{
        try {
            const response = await getAllMinutaRequest(id);
            setMinutas(response.data);
        } catch (error) {
            console.error(error)
        }
    }

    const getMinutasProf = async (id) =>{
        try {
            const response = await getMinutasProfRequest(id);
            setMinutas(response.data);
        } catch (error) {
            console.error(error)
        }
    }

    const getOneMinuta = async (id) =>{
        try {
            const response = await getOneMinutaRequest(id);
            return response.data;
        } catch (error) {
            console.error(error)
        }
    }

    const createMinuta = async (minuta) =>{
        try {
            const response = await createMinutaRequest(minuta);
            console.log("Datos a Crear");
            console.log(response);
            console.log(response.data);
            setMinutas([...minutas, response.data]);
            toast.success('Se creo correctamente la minuta');
        } catch (error) {
            toast.error('Ocurrio un error al crear la minuta')
            console.log(error)
        }
    }

    const updateMinuta = async(id, minuta) =>{
        try {
            const response = await updateMinutaRequest(id, minuta);
            console.log(response);
            toast.success('Se actualizo correctamente la minuta');
        } catch (error) {
            toast.error('Ocurrio un error al actualizar la minuta')
            console.error(error);
        }
    }

    const deleteMinuta = async(id) =>{
        try {
            const response = await deleteMinutaRequest(id);
            setMinutas(minutas.filter(minuta => minuta.id != id));
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    }

    const getAllAgenda = async (id) =>{
        try {
            const response = await getAllAgendaRequest(id);
            setAgendas(response.data);
        } catch (error) {
            console.log(error)
            setAgendas([]);
        }
    }

    const createAgenda = async(id, agenda) =>{
        try {
            console.log("-------------------------")
            console.log(agenda);
            const response = await createAgendaRequest(id, agenda);
            console.log("Datos a Crear");
            console.log(response);
            console.log(response.data);
            setAgendas([...agendas, response.data]);
        } catch (error) {
            console.error(error);
        }
    }

    const deleteAgenda = async(id) =>{
        try {
            const response = await deleteAgendaRequest(id);
            setAgendas(agendas.filter(agenda => agenda.id !== id));
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    const getParticipantes = async(id) =>{
        try {
            const response = await getParticipantesRequest(id);
            setParticipantes(response.data);
        } catch (error) {
            console.log(error)
            setParticipantes([]);
        }
    }

    const updateAsistencia = async (parts) =>{
        parts.map(participante =>{
            try {
                if (participante.Asistencia === 0 || participante.Asistencia === null) {
                    const response = updateAsistenciaRequest(participante.id, {"Asistencia":1});    
                    console.log (response);
                    participantes.map(par => par.id === participante.id ? 1 : par.Asistencia);
                    setParticipantes([...participantes]);
                } else if(participante.Asistencia === 1){
                    const response = updateAsistenciaRequest(participante.id, {"Asistencia":0});
                    participantes.map(par => par.id === participante.id ? 0 : par.Asistencia);
                    setParticipantes([...participantes]);
                    console.log (response);
                }
            } catch (error) {
                console.error(error);
            }
        })
    }

    const updateObservaciones = async(id, observacionesn) =>{
        try {
            const response = updateObservacionesRequest(id, observacionesn)
            console.log(response)
            setObservaciones([...observaciones, observacionesn])
        } catch (error) {
            console.log(error)
        }
        
    }

    return(
        <MinutaContext.Provider value={{minutas,agendas, participantes,
        getAllMinutas,
        createMinuta,
        getAllAgenda,
        createAgenda,
        deleteAgenda,
        getParticipantes,
        updateAsistencia,
        getOneMinuta,
        getMinutasProf,
        deleteMinuta,
        updateMinuta,
        updateObservaciones}}>
            {children}
            <Toaster position="top-center" richColors/>
        </MinutaContext.Provider>
    );

};