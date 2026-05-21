import express from 'express'
import rutasproductos from './modulos/productos/rutas.productos.mjs'

const PUERTO = 3000
const app = express()

app.use('/', rutasproductos)

app.listen(PUERTO)