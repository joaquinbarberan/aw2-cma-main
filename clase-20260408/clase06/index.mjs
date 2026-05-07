import express from 'express'
import { obtenerproductos,obtenerproductosPorId , EliminarproductosPorId, Altaproductos  } from './funciones.mjs' 
const PUERTO = 3000
const app= express()
app.use(express.json()) // ->avisar a express que voy a mandar dartos del tipo json 

//configuracion de una API REST


//GET   api/v1/productos
app.get('/api/v1/productos', obtenerproductos)

//GET  api/v1/productos/:id
app.get('/api/v1/productos/:id',obtenerproductosPorId)

//POST  api/v1/productos  ---> damos de alta un registro
app.post('/api/v1/productos', Altaproductos )

//PUT api/v1/productos/:id ---> modificamos un registro


//DELETE api/v1/productos/:id ---> eliminamos un registro 
app.delete('/api/v1/productos/:id', EliminarproductosPorId )


app.listen(PUERTO)