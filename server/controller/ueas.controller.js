import {pool} from '../db.js'

export const getUeas = async (req, res) => 
{
    try {
        const [result] = await pool.query('SELECT * FROM UEA');
        res.json(result);   
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const getUea = async(req, res) => 
{
    try {
        const [result] = await pool.query('SELECT * FROM UEA WHERE Clave= ?', [req.params.id]);
        if(result.length == 0)
        {
            return res.status(404).json({message: "UEA no encontrada"})
        }
        res.json(result[0]);   
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const createUea = async (req, res) => 
{
    try {
        const {Clave, Nombre, Creditos, Tipo, HorasTeo, HorasPra, Division, Unidad} = req.body
        const [result] = await pool.query('INSERT INTO UEA VALUES (?,?,?,?,?,?,?,?)', 
        [Clave, Nombre, Creditos, Tipo, HorasTeo, HorasPra, Division, Unidad]);
        res.json({
            id: result.insertId,
            Clave,
            Nombre,
            Creditos,
            Tipo,
            HorasTeo,
            HorasPra,
            Division,
            Unidad
        })    
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const updateUea = async(req, res) => 
{
    try {
        const {Clave, Nombre, Creditos, Tipo, HorasTeo, HorasPra, Division, Unidad} = req.body
        const result = await pool.query("UPDATE UEA SET Clave = ?, Nombre = ?, Creditos = ?, Tipo = ?, HorasTeo = ?, HorasPra = ?, Division = ?, Unidad = ? WHERE Clave = ?",[
            Clave, Nombre, Creditos, Tipo, HorasTeo, HorasPra, Division, Unidad,
            req.params.id
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const deleteUea = async(req, res) => 
{
    try {
        const [result] = await pool.query('DELETE FROM UEA WHERE Clave= ?', [req.params.id]);
        if(result.affectedRows === 0)
        {
            return res.status(404).json({message: "UEA no encontrada"}) 
        }
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }   
}

export const getUeaCor = async(req, res) =>{
    try {
        const [result] = await pool.query('SELECT Clave, Nombre FROM UEA ORDER BY Clave');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const createCorrelacion = async(req, res) =>{
    try {
        const {Clave} = req.body
        const [result] = await pool.query('INSERT INTO Prerequisito (UEA, PreUEA) VALUES (?, ?)', [
            req.params.id,
            Clave
        ]);
        res.json(result);

    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const getCorrUea = async(req, res) =>{
    try {
        const [result] = await pool.query(`SELECT Prerequisito.PreUEA as 'Clave', UEA.nombre as 'Nombre' FROM
        Prerequisito JOIN UEA ON (Prerequisito.PreUEA = UEA.Clave) WHERE Prerequisito.UEA = ?`, [
            req.params.id
        ]);
        res.json(result);
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

export const deleteUeaCorr = async(req, res) =>{
    try {
        const [result] = await pool.query(`DELETE FROM Prerequisito WHERE UEA = ? AND PreUEA = ?`,
        [req.params.clave, req.params.ueac]);
        if(result.affectedRows === 0)
            {
                return res.status(404).json({message: "UEA no encontrada"}) 
            }
            return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const getUeasPCorr = async(req, res) =>{
    try {
        const [result] = await pool.query(`SELECT Prerequisito.UEA as 'Clave', UEA.nombre as 'Nombre' FROM
        Prerequisito JOIN UEA ON (Prerequisito.UEA = UEA.Clave)
        WHERE Prerequisito.PreUEA = ?`, [
            req.params.id
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}