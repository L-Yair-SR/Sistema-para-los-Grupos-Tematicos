import DataTable from "react-data-table-component"
import { useMinutas } from "../context/MinutaContext";
import { useEffect, useState } from "react";
import { useLogin } from "../context/LoginContext";

function ParticipantesTable({ gt }) {

    const {participantes, getParticipantes, updateAsistencia} = useMinutas();
    const {token} = useLogin();
    const [selectedRowsS, setSelectedRows] = useState(false);
    const [toggledClearRows, setToggleClearRows] = useState(false);

    useEffect(() =>{
        getParticipantes(gt);
    },[getParticipantes, gt]);

    const columns = [
        {
            name:"noEconomico",
            selector: row => row.noEconomico,
            center:true
        },
        {
            name:"Profesor",
            selector: row => row.Profesor,
            center:true
        },
        {
            name:"Asistencia",
            cell: row => (<span>{row.Asistencia == 1 ? "✅" : "❌"}</span>),
            center:true
        }
    ]

    const handleChange = ({ selectedRows }) => {
        // You can set state or dispatch with something like Redux so we can use the retrieved data
        setSelectedRows(selectedRows);
      };
    
      const handleClearRows = async () => {
        await updateAsistencia(selectedRowsS);
        setToggleClearRows(!toggledClearRows);
      }

if (token.gt == null) {
    return(
        <div>
            <DataTable
            className="justify-center border-rojo-uam w-full border-2 rounded-md p-3"
            columns={columns}
            data={participantes}
            onSelectedRowsChange={handleChange}
            clearSelectedRows={toggledClearRows}
            noDataComponent = "No hay profesores para la minuta"
            />
        </div>
    )
}else{
    return(
        <div>
            <DataTable
            className="justify-center border-rojo-uam w-full border-2 rounded-md p-3"
            columns={columns}
            data={participantes}
            selectableRows
            onSelectedRowsChange={handleChange}
            clearSelectedRows={toggledClearRows}
            noDataComponent = "No hay profesores para la minuta"
            />
            <button onClick={handleClearRows} className="boton p-2 mt-1">Asistencia</button>
        </div>
    )
}
}

export default ParticipantesTable;