import express from 'express'
import * as controlador  from './modulos/productos/controlador.productos.mjs'
import { obtenerUno } from './modulos/productos/modelo.producto.mjs'
const PUERTO = 3000
const app = express()


app.get('/api/v1/productos' , controlador.obtenerTodos)

app.get('/api/v1/productos/:id', obtenerUno)
app.listen(PUERTO)