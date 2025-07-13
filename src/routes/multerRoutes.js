const { Router } = require("express");
const multer = require("multer");
// const File = require('./models');
const router = new Router();


// Configuración de Multer
const storage = multer.diskStorage({
    //Define la carpeta de destino, en este caso uploads/
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    //Define el nombre del archivo. Usa la fecha actual (Date.now()) junto con la extensión original (path.extname(file.originalname)) para evitar conflictos de nombres.
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// Modelo de archivo
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        //La función toma el nombre y la descripción del archivo desde el cuerpo de la solicitud (req.body), y los detalles del archivo subido en req.file.
        const { name, description } = req.body;
        const file = req.file;
        //Crea una instancia de File con los detalles del archivo y la guarda en la base de datos.
        const newFile = new File({
            name,
            description,
            filePath: file.path,
            fileName: file.filename,
        });

        await newFile.save();
        //Si tiene éxito, responde con un mensaje de éxito y los detalles del archivo; 
        res.status(200).json({ message: 'Archivo subido correctamente', file: newFile });
    } catch (err) {
        //si falla, envía un mensaje de error.
        res.status(500).json({ message: 'Error al subir el archivo', error: err });
    }
});

// Obtener archivos
//Define una ruta GET /files para obtener todos los archivos guardados en la base de datos.
router.get('/files', async (req, res) => {
    try {
        const files = await File.find();
        res.status(200).json(files);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los archivos', error: err });
    }
});

module.exports = router;