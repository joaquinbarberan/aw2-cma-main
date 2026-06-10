import express, { json } from 'express';
import pool from './conexion.bd.mjs';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';

const PUERTO = 3000;

////////////////

////////////////
const app = express();
app.use(express.json())//<-- formato json convierte en objeto js dentro de body 
app.use(express.urlencoded({extended:true}))//<-- formato urlencoded convierte en un objeto dentro de body
//admin CRUD
app.use('/admin' , express.static('./fronts/front-admin'))
//login
app.use('/login' , express.static('./fronts/frontLogin'))
//autenticar
app.post('/autenticar' , (req,res)=>{
    //actividad 5
    //generar el id con nanoid
})
//registrar 
app.post('/registrar' ,async (req,res)=>{
    //1-capturar los datos
    //req.body() // tanto json y urlencoded  se guardan aqui 
    console.log(req.body)
    const {usuario,pass} = req.body
    //2-control
    if (!usuario || !pass ) {
        return res.status(400).json({
            mensaje:'datos incompletos'
        })
    }

    //3- encriptacion de datos 
    const salt = await bcrypt.genSalt(10); //<- previene el atatque arcoiris de fuerza bruta 
    const hash = await bcrypt.hash(pass, salt);
    console.log(hash)

    //4 -  guardar el usuario y la contraseña en la BD
    const resultado = await pool.query(`
        INSERT INTO usuarios
            (username,password_hash)
        VALUES
            ($1, $2 )
        `,
        [
            usuario,
            hash
        ]
    )
    //5 - verificar si se realizo la insercion
    if (resultado.rowCount > 0 ) {
        return  res.json({
            mensaje:`el usuario ${usuario} se ha registrado con exito `
        })
    }



    res.status(500).json({
        mensaje:'el registro no se pudo realizar '
    })
})
app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});