import express from 'express'
import multer from 'multer'
import {nanoid} from 'nanoid'
import mime from 'mime-type'
//path
const app = express()

const almacenamiento = multer.diskStorage({
  destination: function (req, file, cb) {
    //chequeos
    cb(null, './archivos');
  },
  filename: function (req, file, cb) {
    //obtengo la extension desde el mime type
    const extension = mime.extension(file.mimetype)
    //creo el nombre del archivo con un identificador unico con nanoid()  
    const nombreImagen = nanoid() + '.' + extension //genera un UID
    cb(null, nombreImagen);
  },
});

const PUERTO = 3000
//ejecutamos multer
const subirArchivo = multer({
    storage: almacenamiento
})

const gestionArchivos = subirArchivo.single('imagen')
app.use('/admin', express.static('./front-admin'))

app.post('/subir-archivo' , (req,res)=>{
    gestionArchivos(req,res , (error)=>{
        if(error) return res.status(500).json({mensaje: 'error en el servidor'})    
        console.log(req.file)
        res.json({mensaje:'ruta subida'})
    })

    
    
})
app.listen(PUERTO)