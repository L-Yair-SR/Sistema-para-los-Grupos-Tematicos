import { useTasks } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import { useGts } from "../context/GtContext";


function TaskCard({ task, gt })
{

    const {deleteTask} = useTasks();
    const {deleteProfGt} = useGts();
    const navigate = useNavigate();

    if(gt){
        return(
            <div className="bg-blanco border-rojo-uam  border-2 rounded-md p-3 mr-10 ml-5 text-center">
            <h2 className="text-lg font-bold">
                {task.Nombre} {task.App} {task.Apm}
            </h2>
            <h2>{task.NoEconomico}</h2>
            <h2>{task.Correo}</h2>
            <div className="flex">
                <button className="boton flex-1" onClick={() => deleteProfGt(task.NoEconomico)}>Borrar</button>
            </div> 
        </div>
        )
    }else{
        return(
            <div className="bg-blanco border-rojo-uam relative  border-2 rounded-md p-3 mr-10 ml-5 text-center">
                <button className="bg-blanco text-negro font-bold border-rojo-uam border-4 rounded-full absolute -top-3 -left-2 p-1 hover:bg-rojo-uam hover:text-blanco" 
                onClick={() => deleteTask(task.NoEconomico)}>X</button>
                <h2 className="text-lg font-bold">
                    <span>{task.Estado == 1 ? "✅" : "❌"}</span>
                    {task.Nombre} {task.App} {task.Apm}
                </h2>
                <h2>{task.NoEconomico}</h2>
                <h2>{task.Correo}</h2>
                <div className="flex">
                    <button className="boton flex-1" onClick={() => navigate(`/edit/${task.NoEconomico}`)}>Actualizar</button>
                </div> 
            </div>
        );
    }  
}

export default TaskCard;