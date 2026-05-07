import express from 'express'

const PUERTO = 3000
const productos = [
    {
        id : 1,
        nombre: "camiseta",
        precio: 200
    },
    {
        id : 2,
        nombre: "pantalon",
        precio: 100
    }
]

const app = express()
//avisar a express que verifique si hay datos del cliente en formato json
app.use(express.json())

const peticionGetenRaiz = ('/', (req, res) => {
    res.status(200)
    res.end('hola con get')
})

app.get('/', peticionGetenRaiz)


app.get('/productos', (req, res) => {
    res.status(200)
    res.json(productos)
    //res.set('content-type', 'application/json')
    //res.end(JSON.stringify(productos))
})
app.post('/productos', (req, res) => {
    //agrega al objeto de req una propiedad llamada "body"
    const producto = req.body 
    productos.push(producto)
    res.status(201).json({mensaje:'producto creado'})
})
app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    console.log(id)
    const arreglofiltrado = productos.filter((producto)=>{
        return producto.id === id
    })
    res.json(arreglofiltrado)
    
    res.status(200)

})

app.listen(PUERTO, () => {
    console.log(`servisor corriendo en http://localhost${PUERTO}`)
})