import {pool} from '../db.js'

export const getAllMinutas = async(req, res) =>
{
    try {
        const [result] = await pool.query('SELECT * FROM Minuta WHERE GrupoTematico = ?',[req.params.id]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const getMinutasProf = async(req, res) =>
{
    try {
        const [result] = await pool.query('SELECT Minuta.* FROM Minuta JOIN ParticipantesMinuta ON (Minuta.id = ParticipantesMinuta.Minuta) WHERE Profesor = ?',[req.params.id]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const getOneMinuta = async(req, res) =>
{
    try {
        const [result] = await pool.query('SELECT * FROM Minuta WHERE id = ?',[req.params.id]);
        if(result.length == 0)
        {
            return res.status(404).json({message: "Minuta no encontrado"})
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const createMinuta = async (req, res) =>{
    try {
        const {Asunto, Fecha, HoraIni, HoraTer, Lugar, Objetivo, GrupoTematico} = req.body
        const [result] = await pool.query("INSERT INTO Minuta(Asunto, Fecha, HoraIni, HoraTer, Lugar, Objetivo, GrupoTematico) VALUES(?,?,?,?,?,?,?)",
        [Asunto, Fecha, HoraIni, HoraTer, Lugar, Objetivo, GrupoTematico]);
        res.json({
            id: result.insertId,
            Asunto,  
            Fecha, 
            HoraIni, 
            HoraTer, 
            Lugar, 
            Objetivo,
            GrupoTematico
        })
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const updateMinuta = async(req,res) =>{
    try {
        const {Asunto, Numero, Fecha, HoraIni, HoraTer, Lugar, Objetivo, GrupoTematico} = req.body
        const result = await pool.query(`UPDATE Minuta SET Asunto = ?, Numero = ?, Fecha = ?, HoraIni = ?, HoraTer = ?, Lugar = ?, Objetivo = ? WHERE id = ?`,
            [Asunto, Numero, Fecha, HoraIni, HoraTer, Lugar, Objetivo, req.params.id]
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}


export const deleteMinuta = async(req,res) =>{
    try {
        const [result] = await pool.query(`DELETE FROM Minuta WHERE id = ?`, [req.params.id]);
        if(result.affectedRows === 0)
            {
                return res.status(404).json({message: "Minuta no encontrada"}) 
            }
            return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const createAgenda = async (req, res) =>{
    try {
        const {Tema, Responsable, FechaCompromiso, Acuerdo} = req.body
        const [result] = await pool.query("INSERT INTO Agenda (Tema, Responsable, FechaCompromiso, Acuerdo, Minuta) VALUES (?,?,?,?,?)",
        [Tema, Responsable, FechaCompromiso, Acuerdo, req.params.id]);
        res.json({
            id: result.insertId,
            Tema, 
            Responsable,
            FechaCompromiso,
            Acuerdo,
            Minuta: req.params.id
        })
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const getAllAgenda = async (req, res) =>{
    try {
        const [result] = await pool.query('SELECT * FROM Agenda WHERE Minuta= ?', [req.params.id]);
        if(result.length == 0)
        {
            return res.status(404).json({message: "No hay Agenda de la minuta"})
        }
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const deleteAgenda = async(req, res) =>{
    try {
        const [result] = await pool.query('DELETE FROM Agenda WHERE id= ?', [req.params.id]);
        if(result.affectedRows === 0)
        {
            return res.status(404).json({message: "Agenda no encontrada"}) 
        }
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const getParticipante = async(req, res) =>{
    try {
        const [result] = await pool.query(`SELECT ParticipantesMinuta.id as 'id', ParticipantesMinuta.Minuta as 'Minuta', Profesor.noEconomico as 'noEconomico', CONCAT_WS(' ',Profesor.Nombre, Profesor.App, Profesor.Apm) as 'Profesor', ParticipantesMinuta.Asistencia as 'Asistencia' FROM 
        ParticipantesMinuta JOIN Profesor ON (ParticipantesMinuta.Profesor = Profesor.NoEconomico) WHERE ParticipantesMinuta.Minuta = ?`, [req.params.id]);
        if(result.length == 0)
        {
            return res.status(404).json({message: "Participante no encontrado"})
        }
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const updateAsistencia = async(req, res) =>{
    try {
        const {Asistencia} = req.body
        const result = await pool.query("UPDATE ParticipantesMinuta SET Asistencia = ? WHERE id = ?",
        [Asistencia, req.params.id]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const updateObservaciones = async(req, res) =>{
    try {
        const {Observaciones} = req.body
        const result = await pool.query(`UPDATE Minuta SET Observaciones = ? WHERE id = ?`,
            [Observaciones, req.params.id]
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}