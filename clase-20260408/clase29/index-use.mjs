import express from 'express'

const PUERTO = 3000

const app = express()

//middlewares
function middleware1(req, res, next) {
    console.log('middleware1')
    next() //--> seguir la pila de ejecucion
    
}   
//la ruta del use sirve como prefijo 
app.use('/saludo',middleware1)

app.get('/', (req, res) => {
    console.log('ejecucion del  callback final ')
    res.send('hola ')
})
app.get('/saludo',  (req, res) => {
    console.log('ejecucion del  callback final ')
    res.send('hola ruta /saludo')
})

app.listen(PUERTO, () => {
    console.log(`http://localhost:${PUERTO}`)
})
