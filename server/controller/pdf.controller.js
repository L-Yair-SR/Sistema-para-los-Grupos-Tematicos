import PDFDocument from 'pdfkit'
import fs from 'node:fs';
import {pool} from '../db.js'

export const createPdf = async (req, res) =>{
    writeToFile(`./pdfs/Minuta-${req.params.id}.pdf`);
    const doc = new PDFDocument({size:'LETTER'});
    const id = req.params.id
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=minuta.pdf`);

    doc.pipe(fs.createWriteStream(`./pdfs/Minuta-${req.params.id}.pdf`));
    doc.pipe(res);
    
    const result =  await getMinuta(id);

    doc.image('./public/50UAM_corto.png', 50, 50, {fit: [100, 100]})
    doc.image('./public/CBI.png', 475, 60, {fit: [100, 100]})
    doc.font('Helvetica-Bold').fontSize(18).text('Departamento de Electrónica',{align: 'center'})
    doc.font('Helvetica-Bold').fontSize(14).text('Formato de Minuta',{align: 'center'})

    
    doc.font('Helvetica').fontSize(12).text(result.Asunto,{align:'center',indent:2});
    doc.text('Num: '+result.id,{align: 'left', continued: true});
    doc.text('Fecha: '+result.Fecha,{align:'right'});
    doc.text('Hora de Inicio: '+result.HoraIni,{align: 'left', continued: true});
    doc.text('Hora de Termino: '+result.HoraTer,{align:'right'});
    doc.text('Lugar de encuentro: '+result.Lugar,{align: 'left', continued: true});
    doc.text('Objetivo: '+result.Objetivo,{align:'right'});
    doc.rect(doc.x-1, 106, 480, doc.y-94).stroke();

    doc.moveDown()
    doc.font('Helvetica-Bold').fontSize(14).text('Observaciones',{align: 'center'});
    doc.font('Helvetica').fontSize(12).text(result.Observaciones,{align: 'left'});
    doc.rect(doc.x-1, 106, 480, doc.y-94).stroke();

    const agenda = await getAgenda(id);

    doc.moveDown()
    doc.font('Helvetica-Bold').fontSize(14).text('Agenda',{align: 'center'});
    agenda.map(age=>{
        doc.font('Helvetica').fontSize(12).text('Tema: '+age.Tema,{indent:2, continued:true});
        doc.font('Helvetica').fontSize(12).text('  Responsable: '+age.Responsable,{indent:2, continued:true});
        doc.font('Helvetica').fontSize(12).text('  Fecha de Compromiso: '+age.FechaCompromiso,{indent:2});
        doc.font('Helvetica').fontSize(12).text('Acuerdo: '+age.Acuerdo,{indent:2});
    })
    doc.rect(doc.x-1, 106, 480, doc.y-94).stroke();

    doc.addPage()

    doc.image('./public/50UAM_corto.png', 50, 50, {fit: [100, 100]})
    doc.image('./public/CBI.png', 475, 60, {fit: [100, 100]})
    const participantes = await getParticipantes(id);
    doc.font('Helvetica-Bold').fontSize(14).text('Participantes',{align: 'center'}).moveDown(3);
    participantes.map((participante,idx)=>{
        if(idx == 0){
            doc.font('Helvetica').fontSize(12).text(participante.Profesor,{});
        }else if((idx%2)==0){
            doc.font('Helvetica').fontSize(12).text(participante.Profesor,75,30+(idx*100),{});
        }else{
            doc.font('Helvetica').fontSize(12).text(participante.Profesor,400,80+(idx*50),{});
        }
        try {
            doc.image(`./firmas/firma-${participante.noEconomico}`, {fit: [75, 75], align: 'center', valign: 'top'})
        } catch (error) {
            console.log(error);
        }
    })
    doc.end();
}


export const createPdfSin = async (req, res) =>{
    writeToFile(`./pdfs/ProgramaSintetico-${req.params.id}.pdf`);
    const doc = new PDFDocument({size:'LETTER'});
    const id = req.params.id

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=minuta.pdf`);

    doc.pipe(fs.createWriteStream(`./pdfs/ProgramaSintetico-${req.params.id}.pdf`));
    doc.pipe(res);

    doc.image('./public/50UAM_corto.png', 50, 50, {fit: [100, 100]})
    doc.image('./public/CBI.png', 475, 60, {fit: [100, 100]})
    doc.font('Helvetica-Bold').fontSize(18).text('Departamento de Electrónica',{align: 'center'})
    doc.font('Helvetica-Bold').fontSize(14).text('Programa de Estudios Sintentico',{align: 'center'})

    const uea  = await getUEA(id);

    doc.font('Helvetica').fontSize(12).text(uea.Nombre+'-'+uea.Clave,{align:'center',indent:2});
    doc.text('Creditos: '+uea.Creditos,{align: 'left', continued: true});
    doc.text('Tipo: '+uea.Tipo,{align:'right'});
    doc.text('Horas Teoricas: '+uea.HorasTeo,{align: 'left', continued: true});
    doc.text('Horas de Practica: '+uea.HorasPra,{align:'right'});
    doc.text('Division: '+uea.Division,{align: 'left', continued: true});
    doc.text('Unidad: '+uea.Unidad,{align:'right'});
    doc.rect(doc.x-1, 106, 480, doc.y-94).stroke();

    const seriaciones = await getSeriacion(id);
    doc.moveDown(2);
    doc.font('Helvetica-Bold').fontSize(14).text('Seriacion',{align: 'center'});
    if (seriaciones) {
        seriaciones.map((seria) =>{
            doc.font('Helvetica').fontSize(12).text(seria.Nombre+'-'+seria.Clave,{align: 'center'});
        })
    }else{
        doc.font('Helvetica').fontSize(12).text('No hay ueas',{align:'right'});
    }
    
    const Objetivos = await getObjetivos(id);
    let listObj = null
    if (Objetivos) {
         listObj = Objetivos.Descripcion.split('/')
    }
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(14).text('Objetivos',{align: 'center'});
    if (listObj) {
        listObj.map((obj) =>{
            doc.font('Helvetica').fontSize(12).text('*'+obj,{align: 'center'});
        })
    }else{
        doc.font('Helvetica').fontSize(12).text('No hay Objetivos',{align:'right'});
    }

    const temas = await getTemario(id);
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(14).text('Contenido Sintetico',{align: 'center'});
    if (temas) {
        temas.map((tema, idx) =>{
            doc.font('Helvetica').fontSize(12).text((idx+1)+'-'+tema.Nombre,{align: 'center'});
        })
    }else{
        doc.font('Helvetica').fontSize(12).text('No hay Temas',{align:'right'});
    }

    const modcons = await getModCon(id);
    doc.moveDown();
    if (modcons) {
        doc.font('Helvetica-Bold').fontSize(14).text('Modalidades de Conduccion',{align: 'center'});
        doc.font('Helvetica').fontSize(12).text(modcons.Descripcion,{align: 'center'});
    } else{
        doc.font('Helvetica').fontSize(12).text('No hay Modalidades de Conduccion',{align:'right'});
    }
    
    const modevas = await getModEva(id);
    doc.moveDown();
    if (modevas) {
        doc.font('Helvetica-Bold').fontSize(14).text('Modalidades de Evaluación',{align: 'center'});
        doc.moveDown();
        doc.font('Helvetica-Bold').fontSize(12).text('Evaluacion Global',{align: 'left'});
        doc.font('Helvetica').fontSize(12).text(modevas.Global,{align: 'left'});
        doc.font('Helvetica-Bold').fontSize(12).text('Evaluacion de Recuperación',{align: 'left'});
        doc.font('Helvetica').fontSize(12).text(modevas.Recuperacion,{align: 'left'});
    }else{
        doc.font('Helvetica').fontSize(12).text('No hay Modalidades de Evaluacion',{align:'right'});
    }

    const biblis = await getBibliografia(id);
    doc.moveDown();
    if (biblis) {
        doc.font('Helvetica-Bold').fontSize(14).text('Bibliografia',{align: 'center'});
        biblis.map((bibli, idx) =>{
            doc.font('Helvetica').fontSize(12).text((idx+1)+'-'+bibli.Autor,{continued:true});
            doc.font('Helvetica').fontSize(12).text(',"'+bibli.Titulo+'"',{continued:true});
            doc.font('Helvetica').fontSize(12).text(','+bibli.Descripcion,{});
        })
    }else{
        doc.font('Helvetica').fontSize(12).text('No hay Bibliografia',{align:'right'});
    }

    doc.end();
}

export const createPdfAnali = async(req, res) =>{
    writeToFile(`./pdfs/ProgramaAnalitico-${req.params.id}.pdf`);
    const doc = new PDFDocument({size:'LETTER'});
    const id = req.params.id

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=minuta.pdf`);

    doc.pipe(fs.createWriteStream(`./pdfs/ProgramaSintetico-${req.params.id}.pdf`));
    doc.pipe(res);

    doc.image('./public/50UAM_corto.png', 50, 50, {fit: [100, 100]})
    doc.image('./public/CBI.png', 475, 60, {fit: [100, 100]})
    doc.font('Helvetica-Bold').fontSize(18).text('Departamento de Electrónica',{align: 'center'})
    doc.font('Helvetica-Bold').fontSize(14).text('Programa de Estudios Análitico',{align: 'center'})

    const uea  = await getUEA(id);

    doc.font('Helvetica').fontSize(12).text(uea.Nombre+'-'+uea.Clave,{align:'center',indent:2});
    doc.text('Creditos: '+uea.Creditos,{align: 'left', continued: true});
    doc.text('Tipo: '+uea.Tipo,{align:'right'});
    doc.text('Horas Teoricas: '+uea.HorasTeo,{align: 'left', continued: true});
    doc.text('Horas de Practica: '+uea.HorasPra,{align:'right'});
    doc.text('Division: '+uea.Division,{align: 'left', continued: true});
    doc.text('Unidad: '+uea.Unidad,{align:'right'});
    doc.rect(doc.x-1, 106, 480, doc.y-94).stroke();

    const seriaciones = await getSeriacion(id);
    doc.moveDown(2);
    doc.font('Helvetica-Bold').fontSize(14).text('Seriacion',{align: 'center'});
    if (seriaciones) {
        seriaciones.map((seria) =>{
            doc.font('Helvetica').fontSize(12).text(seria.Nombre+'-'+seria.Clave,{align: 'center'});
        })
    }else{
        doc.font('Helvetica').fontSize(12).text('No hay ueas',{align:'right'});
    }
    
    const Objetivos = await getObjetivos(id);
    let listObj = null
    if (Objetivos) {
         listObj = Objetivos.Descripcion.split('/')
    }
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(14).text('Objetivos',{align: 'center'});
    if (listObj) {
        listObj.map((obj) =>{
            doc.font('Helvetica').fontSize(12).text('*'+obj,{align: 'center'});
        })
    }else{
        doc.font('Helvetica').fontSize(12).text('No hay Objetivos',{align:'right'});
    }

    const temas = await getTemario(id);
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(14).text('Contenido Desglosado',{align: 'center'});
    if (temas) {
        temas.map(async (tema, idx) => {
            const subtemas = await getSubTemas(id,tema.id);
            doc.font('Helvetica-Bold').fontSize(13).text((idx+1)+'-'+tema.Nombre,{align: 'center'});
            doc.moveDown();
            if (subtemas) {
                subtemas.map((subtema, indx) =>{
                    doc.font('Helvetica').fontSize(12).text((idx+1)+'.'+(indx+1)+'-'+subtema.Nombre,{align: 'center'});
                })
            }else{
                doc.font('Helvetica').fontSize(12).text('No hay SubTemas',{align:'right'});
            }
            doc.moveDown();
        })
    }else{
        doc.font('Helvetica').fontSize(12).text('No hay Temas',{align:'right'});
    }

    
    const modevas = await getModEva(id);
    doc.moveDown();
    if (modevas) {
        doc.font('Helvetica-Bold').fontSize(14).text('Modalidades de Evaluación',{align: 'center'});
        doc.moveDown();
        doc.font('Helvetica-Bold').fontSize(12).text('Evaluacion Global',{align: 'left'});
        doc.font('Helvetica').fontSize(12).text(modevas.Global,{align: 'left'});
        doc.font('Helvetica-Bold').fontSize(12).text('Evaluacion de Recuperación',{align: 'left'});
        doc.font('Helvetica').fontSize(12).text(modevas.Recuperacion,{align: 'left'});
    }else{
        doc.font('Helvetica').fontSize(12).text('No hay Modalidades de Evaluacion',{align:'center'});
    }

    doc.moveDown();
    const modcons = await getModCon(id);
    if (modcons) {
        doc.font('Helvetica-Bold').fontSize(14).text('Modalidades de Conduccion',{align: 'center'});
        doc.font('Helvetica').fontSize(12).text(modcons.Descripcion,{align: 'center'});
    } else{
        doc.font('Helvetica').fontSize(12).text('No hay Modalidades de Conduccion',{align:'right'});
    }

    const biblis = await getBibliografia(id);
    doc.moveDown();
    if (biblis) {
        doc.font('Helvetica-Bold').fontSize(14).text('Bibliografia',{align: 'center'});
        biblis.map((bibli, idx) =>{
            doc.font('Helvetica').fontSize(12).text((idx+1)+'-'+bibli.Autor,{continued:true});
            doc.font('Helvetica').fontSize(12).text(',"'+bibli.Titulo+'"',{continued:true});
            doc.font('Helvetica').fontSize(12).text(','+bibli.Descripcion,{});
        })
    }else{
        doc.font('Helvetica').fontSize(12).text('No hay Bibliografia',{align:'right'});
    }
    
    doc.end();
}

async function getMinuta(id) {
    try {
        const [res] = await pool.query('SELECT * FROM Minuta WHERE id = ?',[id]);
        //console.log("Minuta: "+res[0]);
        return res[0]
    } catch (error) {
        return console.error(error);
    }
}

async function getAgenda(id) {
    try {
        const [res] = await pool.query('SELECT * FROM Agenda WHERE Minuta = ?',[id]);
        //console.log("Agenda: "+res);
        if(res.length == 0)
        {
            return [{Tema:"No hay Agenda en esta Minuta"}]
        }
        return res
    } catch (error) {
        return console.error(error);
    }
}

async function getParticipantes(id) {
    try {
        const [res] = await pool.query(`SELECT ParticipantesMinuta.id as 'id', ParticipantesMinuta.Minuta as 'Minuta', Profesor.noEconomico as 'noEconomico', CONCAT_WS(' ',Profesor.Nombre, Profesor.App, Profesor.Apm) as 'Profesor', ParticipantesMinuta.Asistencia as 'Asistencia' FROM 
        ParticipantesMinuta JOIN Profesor ON (ParticipantesMinuta.Profesor = Profesor.NoEconomico) WHERE ParticipantesMinuta.Minuta = ? AND ParticipantesMinuta.Asistencia=1`,[id]);
        //console.log("Participantes: "+res);
        if(res.length == 0)
        {
            return [{Tema:"No hay Participantes en esta Minuta"}]
        }
        return res
    } catch (error) {
        return console.error(error);
    }
}

async function getUEA(Clave) {
    try {
        const [result] = await pool.query('SELECT * FROM UEA WHERE Clave= ?', [Clave]);
        return result[0]
    } catch (error) {
        return console.error(error);
    }
}

async function getSeriacion(Clave){
    try {
        const [result] = await pool.query(`SELECT Prerequisito.PreUEA as 'Clave', UEA.nombre as 'Nombre' FROM
        Prerequisito JOIN UEA ON (Prerequisito.PreUEA = UEA.Clave) WHERE Prerequisito.UEA = ?`, [
            Clave
        ]);
        if (result.length === 0) {
            return null
        }
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function getObjetivos(Clave){
    try {
        const [result] = await pool.query(`SELECT * FROM ObjetivosGenerales WHERE UEA = ?`, Clave);
        if (result.length === 0) {
            return null
        }
        return result[0];
    } catch (error) {
        console.error(error);
    }
}

async function getTemario(Clave){
    try {
        const [result] = await pool.query('SELECT * FROM Tema WHERE UEA = ?',[Clave]);
        if (result.length === 0) {
            return null
        }
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function getSubTemas(Clave, Tema){
    try {
        const [result] = await pool.query(`SELECT SubTema.*, Tema.id as 'Tema' FROM SubTema JOIN
        TemaSub ON (SubTema.id = TemaSub.SubTema) JOIN
        Tema ON (TemaSub.Tema = Tema.id) WHERE Tema.UEA = ? AND Tema.id = ?`,[Clave, Tema]);
        if (result.length === 0) {
            return null
        }
        //console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function getModCon(Clave){
    try {
        const [result] = await pool.query('SELECT * FROM ModalidadesConduccion WHERE UEA = ?', Clave);
        if (result.length === 0) {
            return null
        }
        return result[0];
    } catch (error) {
        console.error(error);
    }
}

async function getModEva(Clave){
    try {
        const [result] = await pool.query('SELECT * FROM EvaluacionGeneral WHERE UEA = ?',Clave);
        if (result.length === 0) {
            return null
        }
        return result[0];
    } catch (error) {
        console.error(error);
    } 
}

async function getBibliografia(Clave){
    try {
        const [result] = await pool.query(`SELECT Bibliografia.* FROM Bibliografia JOIN
        BibliografiaUEA ON (Bibliografia.id = BibliografiaUEA.Bibliografia) WHERE BibliografiaUEA.UEA = ?`,Clave);
        if (result.length === 0) {
            return null
        }
        return result;
    } catch (error) {
        console.error(error);
    }
}

function writeToFile(fileName) {
    try {
      fs.openSync(fileName,"w+");
      console.log(`Escribiendo en ${fileName}`);
    } catch (error) {
      console.error(`Ocurrio un error al escribir en el archivo: ${error.message}`);
    }
  }