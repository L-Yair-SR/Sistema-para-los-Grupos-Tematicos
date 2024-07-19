import {pool} from '../db.js'
import Jwt from 'jsonwebtoken';

export const getUser = async(req, res) =>{
    try {
        const {User, Pass} = req.body
        const [result] = await pool.query(`SELECT Profesor.NoEconomico as 'NoEconomico', Profesor.Rol as 'Rol', GrupoTematico.id as 'Gt', CONCAT_WS(' ',Profesor.Nombre, Profesor.App, Profesor.Apm) as 'Nombre' FROM Profesor
        LEFT JOIN GrupoTematico ON (Profesor.NoEconomico = GrupoTematico.Coordinador)  WHERE Profesor.NoEconomico = ? AND Profesor.Correo = ?`, 
        [Pass, User]);
        if(result.length === 0){
            return res.status(404).json({message: "Profesor no encontrado"})
        }else{
            const user = result.pop();
            const acsessToken = Jwt.sign({id: user.NoEconomico, role:user.Rol}, "LlaveSecreta");
            res.json({
                user: user.NoEconomico,
                role: user.Rol,
                gt: user.Gt,
                nombre: user.Nombre,
                acsessToken,
            })
        }
    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
}

