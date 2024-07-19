import { Formik, Form} from 'formik'
import { useState } from 'react'
import { useSint } from '../context/SintContext';
import { useLogin } from '../context/LoginContext';

function BiblioForm({uea}){

    const {makeBiblio} = useSint();
    const {token} = useLogin();

    const [biblio] = useState({
        Autor:"",
        Titulo:"",
        Descripcion:""
    });

    if (token)
        if (token.role == 2){
            return(
                <div>
                    <Formik
                    initialValues={biblio}
                    enableReinitialize={true}
                    onSubmit={async (values, { resetForm }) =>{
                        await makeBiblio(uea, values)
                        resetForm()
                    }}>
                        {({handleChange, handleSubmit, values}) =>(
                            <Form className="bg-blanco border-rojo-uam border-2 max-w-lg rounded-md p-4 mx-auto mt-2"
                            onSubmit={handleSubmit}>
                                <h1 className="text-xl text-negro font-bold text-center">Agregar Bibliografia</h1>
                                <label className="block text-negro">Autor</label>
                                <input
                                className="text-negro rounded-md w-full" 
                                type="text" 
                                name='Autor'
                                onChange={handleChange}
                                value={values.Autor}/>
                                <label className="block text-negro">Titulo</label>
                                <input
                                className="text-negro rounded-md w-full" 
                                type="text" 
                                name='Titulo'
                                onChange={handleChange}
                                value={values.Titulo}/>
                                <label className="block text-negro">Descripcion</label>
                                <input
                                className="text-negro rounded-md w-full" 
                                type="text" 
                                name='Descripcion'
                                onChange={handleChange}
                                value={values.Descripcion}/>
                                <button className="block bg-rojo-uam px-3 py-1 text-blanco rounded-md mt-2"
                                type='submit'>Agregar</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            )
        }
}

export default BiblioForm