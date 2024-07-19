import fs from 'node:fs';

export const uploadFile = (req, res) =>{
    res.json(req.file);
    saveImagen(req.file, req.params.id);
}

function saveImagen(file, id) {
    const newPath = `./firmas/firma-${id}`;
    fs.renameSync(file.path, newPath);
}

export const getFiles = async(req, res) =>{
    const files = await fs.promises.readdir('./firmas')
    res.json(files);
}