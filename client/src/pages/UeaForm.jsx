import { Formik, Form} from "formik"
import { useUeas } from "../context/UeaContext"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


function UeaForm()
{

    const{getUea, updateUea, createUea} = useUeas();
    const [uea, setUea] = useState({
        Clave:"",
        Nombre:"",
        Creditos:"",
        Tipo:"Obligatoria",
        HorasTeo:"",
        HorasPra:"",
        Division:"CBI",
        Unidad:"Azcapotzalco"
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() =>{
        const loadOneUea = async () =>{
            if(params.id){
                const uea = await getUea(params.id);
                console.log(uea);
                setUea({
                    Clave:uea.Clave,
                    Nombre:uea.Nombre,
                    Creditos:uea.Creditos,
                    Tipo:uea.Tipo,
                    HorasTeo:uea.HorasTeo,
                    HorasPra:uea.HorasPra,
                    Division:uea.Division,
                    Unidad:uea.Unidad,
                })
            }
        };
        loadOneUea();
    }, []);

    return(
        <div>
            <Formik
            initialValues={uea}
            enableReinitialize={true}
            onSubmit={ async (values) =>{
                if(params.id){
                    await updateUea(params.id, values);
                    setUea({
                        Clave:"",
                        Nombre:"",
                        Creditos:"",
                        Tipo:"",
                        HorasTeo:"",
                        HorasPra:"",
                        Division:"",
                        Unidad:""
                    })
                    navigate("/ueas");
                }else{
                    console.log(values);
                    createUea(values);
                    navigate("/ueas");
                }
            }}
            >
                {({handleChange, handleSubmit, values, isSubmitting}) =>(
                    <Form className="bg-blanco border-rojo-uam border-2 max-w-md rounded-md p-4 mx-auto my-48"
                    onSubmit={handleSubmit}>
                        <h1 className="text-xl text-negro font-bold text-center">{
                            params.id ? "Editar UEA" : "Nueva UEA"
                        }</h1>
                        <label className="block text-negro">Clave</label>
                        <input
                        className="text-negro rounded-md w-full" 
                        type="text"
                        name="Clave"
                        onChange={handleChange}
                        value={values.Clave}/>
                        <label className="block text-negro">Nombre</label>
                        <input
                        className="text-negro rounded-md w-full" 
                        type="text"
                        name="Nombre"
                        onChange={handleChange}
                        value={values.Nombre}/>
                        <label className="block text-negro">Creditos</label>
                        <input
                        className="text-negro rounded-md w-full" 
                        type="text"
                        name="Creditos"
                        onChange={handleChange}
                        value={values.Creditos}/>
                        <label className="block text-negro">Tipo</label>
                        <select 
                        className="text-negro rounded-md w-full"
                        name="Tipo"
                        onChange={handleChange}
                        value={values.Tipo}>
                            <option value="Obligatoria">Obligatoria</option>
                            <option value="Optativa">Optativa</option>
                        </select>
                        <label className="block text-negro">Horas Teoricas</label>
                        <input
                        className="text-negro rounded-md w-full" 
                        type="number"
                        name="HorasTeo"
                        onChange={handleChange}
                        value={values.HorasTeo}/>
                        <label className="block text-negro">Horas Practicas</label>
                        <input
                        className="text-negro rounded-md w-full" 
                        type="number"
                        name="HorasPra"
                        onChange={handleChange}
                        value={values.HorasPra}/>
                        <label className="block text-negro">Division</label>
                        <select 
                        className="text-negro rounded-md w-full"
                        name="Division"
                        onChange={handleChange}
                        value={values.Division}>
                            <option value="CyAD">Ciencias y Artes para el Diseño</option>
                            <option value="CBI">Ciencias Basicas e Ingenieria</option>
                            <option value="CBS">Ciencias Biologicas y de la Salud</option>
                            <option value="CCD">Ciencias de la Comunicacion y Diseño</option>
                            <option value="CNI">Ciencias Naturales e Ingenieria</option>
                            <option value="CSH">Ciencias Sociales y Humanidades</option>
                        </select>
                        <label className="block text-negro">Unidad</label>
                        <select 
                        className="text-negro rounded-md w-full"
                        name="Unidad"
                        onChange={handleChange}
                        value={values.Unidad}>
                            <option value="Azcapotzalco">Azcapotzalco</option>
                            <option value="Cuajimalpa">Cuajimalpa</option>
                            <option value="Iztapalapa">Iztapalapa</option>
                            <option value="Lerma">Lerma</option>
                            <option value="Xochimilco">Xochimilco</option>
                        </select>
                        <div className='flex gap-52'>
                            <button className="block bg-rojo-uam px-3 py-1 text-blanco rounded-md mt-2"
                            type='submit' disabled={isSubmitting}>
                                {params.id ? "Actualizar" : "Registrar"}
                            </button>
                            <button className="block bg-rojo-uam px-3 py-1 text-blanco rounded-md mt-2"
                            onClick={() => navigate("/ueas")}>
                            Cancelar
                        </button>
                        </div>
                        
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default UeaForm