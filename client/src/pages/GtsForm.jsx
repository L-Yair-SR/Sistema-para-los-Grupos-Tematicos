import Select from 'react-select'
import { useTasks } from "../context/TaskContext";
import { useGts } from '../context/GtContext';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

function GtsForm(){

    const {tasks, getTaskSel} = useTasks();
    const {createGT, getGt, updateGt} = useGts();
    const [profs, setProfs] = useState([]);
    const [cordi, setCordi] = useState([{
        Nombre:"",
        Coordinador:"",
    }]);
    const navigate = useNavigate();
    const params = useParams();
    const [gts, setGts] = useState([{
        Nombre:"",
        Coordinador:"",
    }]);
    const [gt, setGt] = useState([{
        Nombre:"",
        Coordinador:"",
    }]);
    const [cors, setCors] = useState([{
        Nombre:"",
        Coordinador:"",
    }]);

    useEffect(()=>{
        const loadTasks = async() =>{
            await getTaskSel();
            setProfs(tasks);
            if (params.id){
                const gtSel = await getGt(params.id);
                setCordi({
                    value: gtSel[0].noEconomico,
                    label: gtSel[0].noEconomico+' - '+gtSel[0].Coordinador
                });
                setGts({
                    Nombre: gtSel[0].GrupoTematico
                });
            }
        }
        loadTasks();
    });

    const ListProfs = profs.map(prof =>{
        return{
            value: prof.NoEconomico,
            label: prof.NoEconomico+' - '+prof.Profesor,
        }
    })

    if(params.id){
        ListProfs.unshift(cordi);
    }
    

    function handleChange(event) {
        console.log(event.target.value);
        console.log(cors);
        setGt({
            Nombre:event.target.value,
            Coordinador:cors.Coordinador
        })
        console.log(gt);
      }

      function handleChangeUpdate(event) {
        console.log(event.target.value);
        console.log(cors);
        setGts({
            Nombre:event.target.value
        })
        if(cors.Coordinador === undefined){
            console.log("Sin Coordinador");
            setGt({
                Nombre:event.target.value,
                Coordinador:cordi.value
            })
            console.log(gt);
        }else{
            setGt({
                Nombre:event.target.value,
                Coordinador:cors.Coordinador
            })
            console.log(gt);
        }
      }

      function handleChangeUpdateSelect(coor){
        console.log(coor);
        setCors({
            Coordinador: coor.value
        })
        setGt({
            Nombre:gts.Nombre,
            Coordinador:coor.value
        })
        console.log(gt);

      }

      const createGruTem = (gruTem) =>{
        console.log(gruTem);
        createGT(gruTem);
        navigate("/gts");
      }

      const updateGruTem = (grute) =>{
        console.log(grute);
        updateGt(params.id, grute);
        navigate("/gts");
      }

    if(params.id){
        return(
            <div className="bg-blanco border-rojo-uam border-2 max-w-md rounded-md p-4 mx-auto my-80">
                <h1 className="text-xl text-negro font-bold text-center">Editar Grupo Tematico</h1>
                <label className="block text-negro" 
                htmlFor="">Coordinador</label>
                <Select
                className='text-negro'
                    options={ListProfs}
                    Name="ProfCo"
                    noOptionsMessage={() => "No hay Profesores"}
                    onChange={(profesele) => handleChangeUpdateSelect(profesele)}/>
                <label className="block text-negro">Nombre</label>
                <input className="text-negro rounded-md w-full"
                type="text" 
                name="Nombre"
                onChange={handleChangeUpdate}
                defaultValue={gts.Nombre}/>
                <div className='flex gap-52'>
                    <button className="block bg-rojo-uam px-3 py-1 text-blanco rounded-md mt-2"
                    type="submit" onClick={()=>{updateGruTem(gt)}}>Actualizar</button>
                    <button className="block bg-rojo-uam px-3 py-1 text-blanco rounded-md mt-2"
                    onClick={() => navigate("/gts")}>
                        Cancelar
                    </button>
                </div>
            </div>
        )
    } else{
        return(
            <div className="bg-blanco border-rojo-uam border-2 max-w-md rounded-md p-4 mx-auto my-80">
                <h1 className="text-xl text-negro font-bold text-center">Nuevo Grupo Tematico</h1>
                <label className="block text-negro"
                htmlFor="">Coordinador</label>
                <Select
                className='text-negro'
                    options={ListProfs}
                    Name="ProfCo"
                    noOptionsMessage={() => "No hay Profesores"}
                    onChange={(profesele) =>{
                        setCors({
                            Coordinador: profesele.value
                        })
                }}/>
                <label className="block text-negro">Nombre</label>
                <input className="text-negro rounded-md w-full"
                type="text" 
                name="Nombre"
                onChange={handleChange}
                value={gts.Nombre}/>
                <div className='flex gap-52'>
                    <button className="block bg-rojo-uam px-3 py-1 text-blanco rounded-md mt-2"
                    type="submit" onClick={()=>{createGruTem(gt)}}>Registrar</button>
                    <button className="block bg-rojo-uam px-3 py-1 text-blanco rounded-md mt-2"
                    onClick={() => navigate("/gts")}>
                        Cancelar
                    </button>
                </div>
                
            </div>
        )
    }
    
}

export default GtsForm;