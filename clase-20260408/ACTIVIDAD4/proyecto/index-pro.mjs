import express from 'express'

const PUERTO = 3000

const app = express()

async function middleware1(req, res, next) {
    //console.log('middleware1')
    const respuestaApi = await fetch('http://localhost:4321/usuario')
    const datosApi = await respuestaApi.json()
    //next() //--> seguir la pila de ejecucion
    //console.log(datosApi.codigo)
    const existeusuario = Number(req.params.codigo) 
    if (existeusuario === datosApi.codigo) {
        console.log('el codigo es correcto puede pasar')
        return next()
    }else{
        console.log('Codigo Incorrecto , no pasa')
        res.status(400).json('Codigo Incorrecto')
    }

    
}   
app.get('/:codigo', middleware1, (req, res) => {
    //res.json(datosApi)
    res.status(200).json("El código es correcto" );
});


app.listen(PUERTO);