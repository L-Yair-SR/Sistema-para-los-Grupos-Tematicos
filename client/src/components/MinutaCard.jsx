import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFile } from "../context/FileContext";
import { usePdf } from "../context/PdfContext";
import { useMinutas } from "../context/MinutaContext";

function MinutaCard({ minuta, prof }){

    const fecha = new Date(minuta.Fecha);
    const navigate = useNavigate();

    const{uploadFile} = useFile();
    const{downloadPdf} = usePdf();
    const{deleteMinuta} = useMinutas();

    const [selectedFile, setSelectedFile] = useState(null);

    const diaFormateadoUTC = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timeZone: 'America/Santiago'
      }).format(fecha);

    const handleFileUpload = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        console.log(selectedFile)
        uploadFile(prof, selectedFile);
      };

    if (!prof) {
        return(
            <div className="bg-blanco border-rojo-uam relative border-2 rounded-md p-3 mr-10 ml-5 text-center">
                <button className="bg-blanco text-negro font-bold border-rojo-uam border-4 rounded-full absolute -top-3 -left-2 p-1 hover:bg-rojo-uam hover:text-blanco" 
                onClick={() => deleteMinuta(minuta.id)}>X</button>
                <h2 className="text-lg font-bold">{minuta.id} - {minuta.Asunto}</h2>
                <h2>{diaFormateadoUTC}</h2>
                <div className="flex">
                    <button className="botonuea flex-1" onClick={() => navigate(`/minutaagenda/${minuta.id}`)}>Agenda</button>
                    <button className="botonuea flex-1" onClick={() => navigate(`/minutaedit/${minuta.id}`)}>Actualizar</button>
                    <button className="botonuea flex-1" onClick={() => downloadPdf(minuta.id)}>PDF</button>
                </div>
            </div>
        )
    }else {
        return(
            <div className="bg-blanco border-rojo-uam  border-2 rounded-md p-3 mr-10 ml-5 text-center">
                <h2 className="text-lg font-bold">{minuta.id} - {minuta.Asunto}</h2>
                <h2>{diaFormateadoUTC}</h2>
                <div className="flex flex-col gap-1">
                    <button className="boton flex-1" onClick={() => navigate(`/minutaagenda/${minuta.id}`)}>Agenda</button>
                    <label className="text-lg font-bold flex-1">Firma</label>
                    <input type="file" className="file:bg-rojo-uam file:text-blanco 
                    file:mr-4 file:py-2 file:p-3 file:rounded-full file:border-0
                    file:text-sm file:font-semibold flex-auto" onChange={handleFileUpload}/>
                    <button className="boton flex-1" onClick={handleUpload}>Firmar</button>
                </div>
            </div>
        ) 
    }
    
}

export default MinutaCard;