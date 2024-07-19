import {useEffect } from 'react'
import TaskCard from '../components/TaskCard';
import { useTasks } from '../context/TaskContext';

function ListTask() {
    const {tasks, loadTask} = useTasks();

    useEffect(()=>{
        loadTask()
    }, []);

    function renderMain()
    {
        if(tasks.length === 0) return <h1>No hay profesores en la Base de Datos</h1>
        return tasks.map((task, index) =>(<TaskCard task={task} key={index}/>));
    }

    return(
        <div>
            <h1 className='text-5xl font-bold text-center p-4'>Profesores</h1>
            <div className='grid grid-cols-4 gap-4'>
                {renderMain()}
            </div>
        </div>
    )

}

export default ListTask