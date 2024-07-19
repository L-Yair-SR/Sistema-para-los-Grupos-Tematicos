import { Formik, Form} from 'formik'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTasks } from '../context/TaskContext';

function TaskForm() {

    const {getTask, updateTask, createTask} = useTasks();
    const [task, setTask] = useState({
        Nombre:"",
        App:"",
        Apm:"",
        NoEconomico:"",
        Correo:"",
        Estado:'1'
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() =>
    {
        const loadOneTask = async () => 
        {
            if(params.id)
            {
                const task = await getTask(params.id);
                console.log(task)
                setTask({
                    Nombre: task.Nombre,
                    App: task.App,
                    Apm: task.Apm,
                    NoEconomico: task.NoEconomico, //Checar
                    Correo: task.Correo,
                    Estado: task.Estado,
                })
            }
        };
        loadOneTask();
    }, [])


    return(
        <div>
            <Formik 
            initialValues={task}
            enableReinitialize = {true}
            onSubmit={async (values) =>{ //Puede ir actions tambien
                if(params.id)
                {
                    await updateTask(params.id, values);
                    setTask(
                        {
                            Nombre:"",
                            App:"",
                            Apm:"",
                            NoEconomico:"",
                            Correo:"",
                            Estado:'1'
                        })  
                    navigate("/profesores");        
                }else
                {
                    createTask(values);
                    navigate("/profesores");
                }
                setTask(
                    {
                        Nombre:"",
                        App:"",
                        Apm:"",
                        NoEconomico:"",
                        Correo:"",
                        Estado:'1'
                    })  
            }}
            >
                {({handleChange, handleSubmit, values, isSubmitting}) => (
                    <Form className="bg-blanco border-rojo-uam border-2 max-w-md rounded-md p-4 mx-auto my-64"
                    onSubmit={handleSubmit}>
                        <h1 className="text-xl text-negro font-bold text-center">{
                            params.id ? "Editar Profesor" : "Nuevo Profesor"
                        }</h1>
                    <label className="block text-negro">Nombre</label>
                    <input
                    className="text-negro rounded-md w-full" 
                    type="text" 
                    name='Nombre'
                    onChange={handleChange}
                    value={values.Nombre} />
                    <label className="block text-negro">Apellido Paterno</label>
                    <input 
                    className="text-negro rounded-md w-full"
                    type="text" 
                    name='App'
                    onChange={handleChange}
                    value={values.App} />
                    <label className="block text-negro">Apellido Materno</label>
                    <input 
                    className="text-negro rounded-md w-full"
                    type="text" 
                    name='Apm'
                    onChange={handleChange}
                    value={values.Apm} />
                    <label className="block text-negro">Numero Economico</label>
                    <input
                    className="text-negro rounded-md w-full" 
                    type="number" 
                    name='NoEconomico'
                    onChange={handleChange}
                    value={values.NoEconomico} />
                    <label className="block text-negro">Correo</label>
                    <input
                    className="text-negro rounded-md w-full" 
                    type="text" 
                    name='Correo'
                    onChange={handleChange}
                    value={values.Correo} />
                    <label className="block text-negro">Estado</label>
                    <select
                    className="text-negro rounded-md w-full" 
                    name="Estado"
                    onChange={handleChange}
                    value={values.Estado}>
                        <option value ='1'>Activo</option>
                        <option value ='0'>No Activo</option>
                    </select>
                    <div className='flex gap-52'>
                        <button className="block bg-rojo-uam px-3 py-1 text-blanco rounded-md mt-2"
                        type='submit' disabled={isSubmitting}>
                            {params.id ? "Actualizar" : "Registrar"}
                        </button>
                        <button className="block bg-rojo-uam px-3 py-1 text-blanco rounded-md mt-2"
                        onClick={() => navigate("/profesores")}>
                            Cancelar
                        </button>
                    </div>
                    
                    </Form>
                )}
            </Formik>
        </div>
    )
}
export default TaskForm