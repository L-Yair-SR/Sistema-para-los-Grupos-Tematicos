import {pool} from '../db.js'

export const getTasks = async (req, res) => 
{
    try {
        const [result] = await pool.query('SELECT * FROM Profesor WHERE NoEconomico != 4422');
        res.json(result);   
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const getTask = async(req, res) => 
{
    try {
        const [result] = await pool.query('SELECT * FROM Profesor WHERE NoEconomico= ?', [req.params.id]);
        if(result.length == 0)
        {
            return res.status(404).json({message: "Profesor no encontrado"})
        }
        res.json(result[0]);   
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const createTask = async (req, res) => 
{
    try {
        const {Nombre, App, Apm, NoEconomico, Correo, Estado} = req.body
        const [result] = await pool.query('INSERT INTO Profesor VALUES (?,?,?,?,?,?,3)', 
        [NoEconomico, Nombre, App, Apm, Correo, Estado]);
        res.json({
            id: result.insertId,
            NoEconomico,
            Nombre,
            App,
            Apm,
            Correo,
            Estado
        })    
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const updateTask = async(req, res) => 
{
    try {
        const {Nombre, App, Apm, NoEconomico, Correo, Estado} = req.body
        const result = await pool.query("UPDATE Profesor SET NoEconomico = ?, Nombre = ?, App = ?, Apm = ?, Correo = ?, Estado = ? WHERE NoEconomico = ?",[
            NoEconomico, Nombre, App, Apm, Correo, Estado,
            req.params.id
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const deleteTask = async(req, res) => 
{
    try {
        const [result] = await pool.query('DELETE FROM Profesor WHERE NoEconomico= ?', [req.params.id]);
        if(result.affectedRows === 0)
        {
            return res.status(404).json({message: "Profesor no encontrado"}) 
        }
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }   
}

export const getTaskSel = async(req, res) =>{
    try {
        const [result] = await pool.query(`SELECT NoEconomico as 'NoEconomico', CONCAT_WS(' ',Nombre, App, Apm) as 'Profesor' From Profesor where NoEconomico not in(
            SELECT Coordinador From GrupoTematico) AND NoEconomico != 4422`);
        if(result.length == 0)
        {
            return res.status(404).json({message: "Profesor no encontrado"})
        }
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}