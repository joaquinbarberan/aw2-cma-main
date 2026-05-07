import express from 'express'

const PUERTO = 3000

const app = express()

//middlewares
function middleware1(req, res, next) {
    console.log('middleware1')
    //next() //--> seguir la pila de ejecucion
    const existeusuario=true
    if (existeusuario) {
        console.log('usuario existe , pasa')
        return next()
    }
    console.log('usuario no existe , no pasa')
    res.status(403).send('usuario no registrado')
}   

app.get('/', middleware1, (req, res) => {
    console.log('ejecucion del  callback final ')
    res.send('hola ')
})

app.listen(PUERTO, () => {
    console.log(`http://localhost:${PUERTO}`)
})
