import {Formik, Form} from 'formik'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMinutas } from '../context/MinutaContext';
import { useLogin } from '../context/LoginContext';

function MinutaForm() {

    const {getOneMinuta, updateMinuta, createMinuta} = useMinutas();
    const{token} = useLogin();
    
    const navigate = useNavigate();
    const params = useParams();

     
    const hoy = new Date().toISOString().slice(0, 10)

    const [minuta, setMinuta] = useState({
        Asunto:"",
        Fecha: hoy,
        HoraIni:"",
        HoraTer:"",
        Lugar:"",
        Objetivo:"",
        GrupoTematico: token.gt
    });

    useEffect(() =>{
        
        const loadOneMinuta = async () =>{
            if(params.id){
                const minuta = await getOneMinuta(params.id);
                console.log(minuta);
                setMinuta({
                    Asunto:minuta.Asunto,
                    Fecha:minuta.Fecha,
                    HoraIni:minuta.HoraIni,
                    HoraTer:minuta.HoraTer,
                    Lugar:minuta.Lugar,
                    Objetivo:minuta.Objetivo,
                    GrupoTematico: token.gt
                })
            }
        };
        loadOneMinuta();
    }, [])


    return(
        <div>
            <Formik
            initialValues={minuta}
            enableReinitialize = {true}
            onSubmit={async (values) =>{
                if (params.id) {
                    await updateMinuta(params.id, values);
                    setMinuta({
                        Asunto:"",
                        Fecha:"",
                        HoraIni:"",
                        HoraTer:"",
                        Lugar:"",
                        Objetivo:"",
                        GrupoTematico: token.gt
                    })
                    navigate("/minuta")
                }else{
                    console.log(values);
                    await createMinuta(values);
                    navigate("/minuta");
                }
            }}>
                {({handleChange, handleSubmit, values})=>(
                    <Form 
                    className="bg-blanco border-rojo-uam border-2 max-w-md rounded-md p-4 mx-auto my-56"
                    onSubmit={handleSubmit}>
                        <h1 className="text-xl text-negro font-bold text-center">Nueva Minuta</h1>
                        <label className="block text-negro">Asunto</label>
                        <input 
                        className="text-negro rounded-md w-full"
                        type="text"
                        name='Asunto'
                        onChange={handleChange}
                        value={values.Asunto}/>
                        <label className="block text-negro">Fecha</label>
                        <input 
                        className="text-negro rounded-md w-full"
                        type="date"
                        name='Fecha'
                        onChange={handleChange}
                        value={values.Fecha}/>
                        <label className="block text-negro">Hora de Inicio</label>
                        <input 
                        className="text-negro rounded-md w-full"
                        type="time"
                        name='HoraIni'
                        onChange={handleChange}
                        value={values.HoraIni}/>
                        <label className="block text-negro">Hora de Finalización</label>
                        <input 
                        className="text-negro rounded-md w-full"
                        type="time"
                        name = 'HoraTer' 
                        onChange={handleChange}
                        value={values.HoraTer}/>
                        <label className="block text-negro">Lugar</label>
                        <input 
                        className="text-negro rounded-md w-full"
                        type="text"
                        name='Lugar'
                        onChange={handleChange}
                        value={values.Lugar}/>
                        <label className="block text-negro">Objetivo</label>
                        <input 
                        className="text-negro rounded-md w-full"
                        type="text"
                        name='Objetivo'
                        onChange={handleChange}
                        value={values.Objetivo}/>
                        <div className='flex gap-52'>
                            <button type='submit' className="block bg-rojo-uam px-3 py-1 text-blanco rounded-md mt-2">
                                Crear
                            </button>
                            <button className=" bg-rojo-uam px-3 py-1 text-blanco rounded-md mt-2"
                            onClick={() => navigate("/minuta")}>
                                Cancelar
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default MinutaForm