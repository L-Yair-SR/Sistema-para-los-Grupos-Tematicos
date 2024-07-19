import {Formik, Form} from 'formik';
import ListAgenda from '../components/ListAgenda';
import { useParams, useNavigate } from 'react-router-dom';
import { useMinutas } from '../context/MinutaContext';
import { useEffect, useState } from 'react';
import ParticipantesTable from '../components/ParticipantesTable';
import MinutaFCard from '../components/MinutaFCard';
import ListObser from '../components/ListObser';
import { useLogin } from '../context/LoginContext';


function MinutaForm2() {

    const params = useParams();
    const navigate = useNavigate();

    const {createAgenda, getOneMinuta, updateObservaciones} = useMinutas();
    const {token} = useLogin();

    const [minuta, setMinuta] = useState([]);
    const [observacion, setObservacion] = useState([{
        Observaciones:""
    }]);
    const [agenda] = useState({
        Tema: "",
        Responsable: "",
        FechaCompromiso: "",
        Minuta: params.id
    })

    useEffect( () => {
        const loadOneMinuta = async() =>{
            const min = await getOneMinuta(params.id);
            setMinuta(min);
            console.log(minuta)
        }
        loadOneMinuta();
    },[])

    function handleText(event){
        setObservacion({
            Observaciones:event.target.value
        })
    }

    function UpdateObs(Observaciones){
        console.log(Observaciones);
        updateObservaciones(params.id, Observaciones);
        setObservacion({
            Observaciones:""
        })
    }

if (token.gt == null) {
    return (
        <div className="grid grid-cols-2 grid-rows-[1fr, 1fr, 1fr]">
            <div className='row-start-1 row-span-1 col-span-2'>
            <button className='bg-blanco border-rojo-uam border-4 -ml-4 mt-2 text-xl rounded-lg p-1 hover:bg-rojo-uam hover:text-blanco' onClick={() => navigate('/minuta')}>Cancelar</button>
                <h1 className='text-3xl font-bold text-center p-4'>Minuta</h1>
                <MinutaFCard minuta={minuta}/>
            </div>
            <div className='row-start-2 row-span-1 col-span-2'>
                <h1 className='text-3xl font-bold text-center p-4'>Observaciones</h1>
                <ListObser minuta={params.id}/>
            </div>
            <div className="grid grid-rows-2 row-start-3 row-span-1 p-1">
                <div className='row-start-1 row-span-1'>
                    <ListAgenda minuta={params.id}/>
                </div>
            </div>
            <div className=' row-start-3 row-span-1'>
                <label className='text-4xl font-bold p-4' >Profesores</label>
                <ParticipantesTable
                className="w-full" gt={params.id}></ParticipantesTable>
            </div>
        </div>
    )
} else{
    return (
        <div className="grid grid-cols-2 grid-rows-[1fr, 1fr, 1fr]">
            <div className='row-start-1 row-span-1 col-span-2'>
            <button className='bg-blanco border-rojo-uam border-4 -ml-4 mt-2 text-xl rounded-lg p-1 hover:bg-rojo-uam hover:text-blanco' onClick={() => navigate('/minuta')}>Cancelar</button>
                <h1 className='text-3xl font-bold text-center p-4'>Minuta</h1>
                <MinutaFCard minuta={minuta}/>
            </div>
            <div className='row-start-2 row-span-1 col-span-2'>
                <h1 className='text-3xl font-bold text-center p-4'>Observaciones</h1>
                <ListObser minuta={params.id}/>
                <textarea className="text-negro border-rojo-uam border-2 rounded-md w-full h-20 mt-2 resize"
                name="Observaciones"
                value={observacion.Observaciones}
                onChange={handleText}></textarea>
                <button className="block bg-rojo-uam px-3 py-1 text-blanco rounded-md mt-2"
                type="submit" onClick={()=>{UpdateObs(observacion)}}>Agregar</button>
            </div>
            <div className="grid grid-rows-2 row-start-3 row-span-1 p-1">
                <div>
                    <Formik
                    initialValues={agenda}
                    enableReinitialize={true}
                        onSubmit={async (values, { resetForm }) =>{
                            createAgenda(params.id, values);
                            resetForm({});
                        }}
                    >
                        {({handleChange, handleSubmit, values}) =>(
                                <Form className="bg-blanco border-rojo-uam border-2 max-w-md rounded-md p-4 mx-auto"
                                onSubmit={handleSubmit} id='agenda'>
                                <h1 className="text-xl text-negro font-bold text-center">Puntos a Tratar</h1>
                                <label className="block text-negro">Tema</label>
                                <input 
                                className="text-negro rounded-md w-full"
                                type="text" name="Tema" 
                                onChange={handleChange}
                                value={values.Tema}/>
                                <label className="block text-negro">Responsable</label>
                                <input 
                                className="text-negro rounded-md w-full"
                                type="text" name="Responsable" 
                                onChange={handleChange}
                                value={values.Responsable} />
                                <label>Acuerdo</label>
                                <textarea className="text-negro rounded-md w-full h-20 resize" 
                                name="Acuerdo" form='agenda' onChange={handleChange}
                                value={values.Acuerdo}/>
                                <label className="block text-negro">Fecha</label>
                                <input 
                                className="text-negro rounded-md w-full"
                                type="date" name="FechaCompromiso" 
                                onChange={handleChange}
                                value={values.FechaCompromiso} />
                                <button className="block bg-rojo-uam px-3 py-1 text-blanco rounded-md mt-2"
                                type='submit'>Agregar</button>
                                </Form>
                        )}
                    </Formik>
                </div>
                <div className='row-start-2 row-span-1'>
                    <ListAgenda minuta={params.id}/>
                </div>
            </div>
            <div className=' row-start-3 row-span-1'>
                <label className='text-4xl font-bold p-4' >Profesores</label>
                <ParticipantesTable
                className="w-full" gt={params.id}></ParticipantesTable>
            </div>
        </div>
    )
}
    
}

export default MinutaForm2