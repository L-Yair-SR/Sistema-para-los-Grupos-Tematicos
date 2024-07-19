import { Formik, Form } from "formik"
import { useState } from 'react';
import { useLogin } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { URL } from "../api/config";

function Login(){

    const {makeLogin} = useLogin();
    const navigate = useNavigate();
    const [user] = useState({
        User:"",
        Pass:""
    });

    return(
        <div className="">
            <Formik
            initialValues={user}
            enableReinitialize = {true}
            onSubmit={ async (values, { resetForm }) =>{
                console.log(values)
                console.log(URL);
                const response = await makeLogin(values);
                console.log(response)
                if(response){
                    if(response === 404){
                        navigate("/login");
                    }else{
                        navigate("/");
                    }
                }
                resetForm();    
            }}>
                {({handleChange, handleSubmit, values})=>(
                    <Form className="bg-blanco max-w-md border-rojo-uam border-4 rounded-md p-4 mx-auto my-80" 
                    onSubmit={handleSubmit}>
                        <h1 className="text-xl text-negro font-bold text-center">Inicio de Sesion</h1>
                        <label className="block text-negro">Usuario</label>
                        <input 
                        className="text-negro rounded-md w-full"
                        type="text" 
                        name="User" 
                        onChange={handleChange}
                        value={values.User} />
                        <label className="block text-negro" 
                        htmlFor="">Contraseña</label>
                        <input 
                        className="text-negro rounded-md w-full"
                        type="password" 
                        name="Pass" 
                        onChange={handleChange}
                        value={values.Pass} />
                        <button className="block bg-rojo-uam px-2 py-1 text-blanco rounded-md mt-2" 
                        type='submit'>Iniciar</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Login