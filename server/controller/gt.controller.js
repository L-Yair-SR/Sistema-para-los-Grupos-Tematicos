import { pool } from "../db.js";

export const getGts = async(req, res) =>
{
    try {
        const [result] = await pool.query(`SELECT GrupoTematico.id as 'id', GrupoTematico.Nombre as 'GrupoTematico', CONCAT_WS(' ',Profesor.Nombre, Profesor.App, Profesor.Apm) as 'Coordinador' FROM
        GrupoTematico JOIN Profesor ON (GrupoTematico.Coordinador = Profesor.NoEconomico)`);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const getGt = async(req, res) =>{
    try {
        const  [result] = await pool.query(`SELECT GrupoTematico.id as 'id', GrupoTematico.Nombre as 'GrupoTematico', Profesor.noEconomico as 'noEconomico', CONCAT_WS(' ',Profesor.Nombre, Profesor.App, Profesor.Apm) as 'Coordinador' FROM
        GrupoTematico JOIN Profesor ON (GrupoTematico.Coordinador = Profesor.NoEconomico) WHERE GrupoTematico.id =?`,[req.params.id]);
        if(result.length == 0)
        {
            return res.status(404).json({message: "Grupo Tematico no encontrado"})
        }
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const createGt = async(req, res) =>{
    try {
        const {Nombre, Coordinador} = req.body
        const [result] = await pool.query("INSERT INTO GrupoTematico(Nombre, Coordinador) VALUES(?, ?)",
        [Nombre, Coordinador]);
        res.json({
            id: result.insertId,
            Nombre,
            Coordinador
        })
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const updateGt = async(req, res) =>{
    try {
        const {Nombre, Coordinador} = req.body;
        const result = await pool.query("UPDATE GrupoTematico SET Nombre = ?, Coordinador = ? WHERE id = ?",
        [Nombre, Coordinador, req.params.id]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const deleteGt = async(req, res) =>{
    try {
        const [result] = await pool.query('DELETE FROM GrupoTematico WHERE id = ?',
        [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({message: "Grupo Tematico no encontrado"})
        }
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const getUeaGT = async(req, res) =>{
    try {
        const [result] = await pool.query(`SELECT Clave as 'Clave', Nombre as 'Nombre' From UEA where Clave not in (
            SELECT Clave FROM UEA_Tematico)`);
            res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const addUeaGt = async(req, res) =>{
    try {
        const {Clave} = req.body;
        const [result] = await pool.query(`INSERT INTO UEA_Tematico (GrupoTematico, Clave) VALUES(?, ?)`,
    [req.params.id, Clave]);
    res.json({
        id: result.insertId,
        GrupoTematico: req.params.id,
        Clave
    }) 
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const deleteUeaGt = async(req, res) =>{
    try{
        const [result] = await pool.query(`DELETE FROM UEA_Tematico WHERE Clave = ?`, [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({message: "UEA del Grupo Teamtico no encontrado"})
        }
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}


export const getAllGtUea = async(req, res) =>{
    try {
        const [result] = await pool.query(`SELECT UEA.Clave as 'Clave', UEA.Nombre as 'Nombre' FROM
        UEA JOIN UEA_Tematico on (UEA.Clave = UEA_Tematico.Clave)
        WHERE UEA_Tematico.GrupoTematico = ?`,
        [req.params.id]);
        if(result.length == 0)
        {
            return res.status(404).json({message: "UEA's no encontradas"})
        }
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const getProfGT = async(req, res) =>{
    try {
        const [result] = await pool.query(`SELECT NoEconomico as 'NoEconomico', CONCAT_WS(' ',Profesor.Nombre, Profesor.App, Profesor.Apm) as 'Nombre' FROM Profesor
        WHERE NoEconomico NOT IN (SELECT Profesor FROM ParticipantesTematico) AND NoEconomico NOT IN (SELECT Coordinador FROM GrupoTematico) AND NoEconomico != 4422`)
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const addProfGt = async(req, res) =>{
    try {
        const {NoEconomico} = req.body
        const [result] = await pool.query(`INSERT INTO ParticipantesTematico (Profesor, GrupoTematico) VALUES (?, ?)`,
        [NoEconomico, req.params.id]);
        res.json({
            id: result.insertId,
            NoEconomico,
            GrupoTematico: req.params.id
        }) 
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const deleteProfGt = async(req, res) =>{
    try {
        const [result] = await pool.query(`DELETE FROM ParticipantesTematico WHERE Profesor = ?`, [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({message: "Profesor del Grupo Teamtico no encontrado"})
        }
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const getAllGtProf = async(req, res) =>{
    try {
        const [result] = await pool.query(`SELECT Profesor.NoEconomico as 'NoEconomico', CONCAT_WS(' ',Profesor.Nombre, Profesor.App, Profesor.Apm) as 'Nombre', Profesor.Correo as 'Correo' FROM Profesor
        JOIN ParticipantesTematico ON (Profesor.NoEconomico = ParticipantesTematico.Profesor) 
        WHERE ParticipantesTematico.GrupoTematico = ?`,[req.params.id]);
        if(result.length == 0)
        {
            return res.status(404).json({message: "Profesores no encontrados"})
        }
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

