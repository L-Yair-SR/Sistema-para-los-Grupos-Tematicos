import { pool } from "../db.js";

export const getObjetivos = async (req,res) =>{
    try {
        const [result] = await pool.query(`SELECT * FROM ObjetivosGenerales WHERE UEA = ?`, [req.params.id]);
        if(result.length == 0)
            {
                return res.status(404).json({message: "La UEA no tiene Objetivos"})
            }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const makeObjetivos = async (req,res) =>{
    try{
        const {Objetivos} = req.body
        await pool.query(`UPDATE ObjetivosGenerales SET Descripcion = ? WHERE UEA = ?`, 
        [Objetivos, req.params.id]);
        const [result] = await pool.query(`SELECT * FROM ObjetivosGenerales WHERE UEA = ?`, [req.params.id]);
        if(result.length == 0)
            {
                return res.status(404).json({message: "La UEA no tiene Objetivos"})
            }
        res.json(result[0]);
    } catch(error){
        return res.status(500).json({ message : error.message});
    }
}

export const deleteObjetivos = async(req,res) =>{
    try {
        const {Objetivos} = req.body
        const[result] = await pool.query('DELETE FROM ObjetivosGenerales WHERE UEA = ?',[req.params.id]);
        if(result.affectedRows === 0)
            {
                return res.status(404).json({message: "UEA no encontrada"}) 
            }
        const [resu] = await pool.query('INSERT INTO ObjetivosGenerales(Descripcion, UEA) VALUES(?,?)',
        [Objetivos, req.params.id]);
         res.json(resu);   
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const getTemario = async(req, res) =>{
    try {
        const [result] = await pool.query('SELECT * FROM Tema WHERE UEA = ?',[req.params.id]);
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const makeTema = async(req, res) =>{
    try {
        const {Nombre} = req.body
        const[result] = await pool.query('INSERT INTO Tema(Nombre, UEA) VALUES(?,?)',[Nombre, req.params.id]);
        res.json({
            id: result.insertId,
            Nombre,
            UEA: req.params.id
        })
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const deleteTema = async(req, res)=>{
    try {
        const [result] = await pool.query('DELETE FROM Tema WHERE id = ?',[req.params.id]);
        if(result.affectedRows === 0)
            {
                return res.status(404).json({message: "Tema no encontrado"}) 
            }
            return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const getModCon = async(req, res) =>{
    try {
        const [result] = await pool.query('SELECT * FROM ModalidadesConduccion WHERE UEA = ?', [req.params.id]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const makeModCon = async(req, res) =>{
    try {
        const {Descripcion} = req.body
        const [result] = await pool.query('INSERT INTO ModalidadesConduccion(Descripcion, UEA) VALUES (?,?)',
        [Descripcion,req.params.id]);
        res.json({
            id: result.insertId,
            Descripcion,
            UEA:req.params.id
        })
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const getModEva = async(req, res) =>{
    try {
        const [result] = await pool.query('SELECT * FROM EvaluacionGeneral WHERE UEA = ?',[req.params.id]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const updateModEva = async(req, res) =>{
    try {
        const{Global, Recuperacion} = req.body
        if (Global) {
            await pool.query('UPDATE EvaluacionGeneral SET Global = ? WHERE UEA = ?',
                [Global, req.params.id]
            )
        }
        if (Recuperacion) {
            await pool.query('UPDATE EvaluacionGeneral SET Recuperacion = ? WHERE UEA = ?',
                [Recuperacion, req.params.id]
            )
        }
        const [result] = await pool.query('SELECT * FROM EvaluacionGeneral WHERE UEA = ?',[req.params.id]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const getBibli = async(req, res) =>{
    try {
        const [result] = await pool.query(`SELECT Bibliografia.* FROM Bibliografia JOIN
        BibliografiaUEA ON (Bibliografia.id = BibliografiaUEA.Bibliografia) WHERE BibliografiaUEA.UEA = ?`,[req.params.id])
        if(result.length == 0)
            {
                return res.status(404).json({message: "La UEA no tiene Bibliografia"})
            }
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const makeBibli = async(req, res) =>{
    try {
        const {Autor, Titulo, Descripcion} = req.body
        const [result] = await pool.query('INSERT INTO Bibliografia(Autor, Titulo, Descripcion) VALUES (?,?,?)',
        [Autor, Titulo, Descripcion]);
        await pool.query('INSERT INTO BibliografiaUEA(UEA, Bibliografia) VALUES (?,?)',
        [req.params.id, result.insertId]);
        const [resu] = await pool.query(`SELECT Bibliografia.* FROM Bibliografia JOIN
        BibliografiaUEA ON (Bibliografia.id = BibliografiaUEA.Bibliografia) WHERE BibliografiaUEA.UEA = ?`,[req.params.id])
        res.json(resu)
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const deleteBibli = async(req, res) =>{
    try {
        const [result] = await pool.query('DELETE FROM Bibliografia WHERE id = ?',[req.params.id]);
        if(result.affectedRows === 0)
            {
                return res.status(404).json({message: "Bibliografia no encontrado"}) 
            }
            return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const getSubTemas = async(req, res) =>{
    try {
        const [result] = await pool.query(`SELECT SubTema.*, Tema.id as 'Tema' FROM SubTema JOIN
                                            TemaSub ON (SubTema.id = TemaSub.SubTema) JOIN
                                            Tema ON (TemaSub.Tema = Tema.id) WHERE Tema.UEA = ? AND Tema.id = ?`,
                                            [req.params.clave, req.params.id]);
        if(result.length == 0)
        {
            return res.status(404).json({message: "La UEA no tiene SubTemas"})
        }
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const makeSubTema = async(req, res) =>{
    try {
        const {Nombre} = req.body
        const [result] = await pool.query(`INSERT INTO SubTema(Nombre) VALUES (?)`,[Nombre]);
        await pool.query(`INSERT INTO TemaSub (Tema, SubTema) VALUES (?,?)`,[req.params.id, result.insertId]);
        res.json({
            id:result.insertId,
            Nombre,
            Tema:req.params.id 
        })
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

export const deleteSubTema = async(req, res) =>{
    try {
        const [result] = await pool.query(`DELETE FROM SubTema WHERE id = ?`,[req.params.id]);
        if(result.affectedRows === 0)
            {
                return res.status(404).json({message: "SubTema no encontrado"}) 
            }
        return res.sendStatus(204);
    } catch (error) {
        
    }
}