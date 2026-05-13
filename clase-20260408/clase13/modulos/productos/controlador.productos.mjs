import * as modelo from './modelo.producto.mjs'
//modelo es un espacio de nombres 

export function obtenerTodos(req,res){
    const productos = modelo.obtenerTodos()
    res.json(productos)
}