import * as modelo from './modelo.productos.mjs'
import * as vista from './vista.productos.mjs'

export async function obtenerTodos(req, res) {
     const datosProductos =await  modelo.obtenerTodos()
    const respuestaVista = vista.obtenerTodos(datosProductos)
    res.json(respuestaVista)
}
export async function obtenerUno(req, res) {
    // id_producto -> nomenclatura "snake case"
    // idProducto -> nomenclatura "camel case"
    const idProducto = Number(req.params.id)
    const datosProductos = await modelo.obtenerUno (idProducto) //<-- arreglo
    const resultado =  vista.obtenerUno (datosProductos)
    // si hay o no productos y responder en consecuencia
    if (resultado.length > 0) {
        // Tener un criterio de datos a enviar
        res.json(resultado)
    } else {
        res.status(404).json({ mensaje: 'Producto con id ${ idProducto } no encontrado"'})
    }
}
export async function EliminarUno(req,res){
    const idProducto = Number(req.params.id)
    const datosProductos = await modelo.EliminarUno (idProducto) //<-- arreglo
    const resultado =  vista.EliminarUno (datosProductos)
    if (resultado.length > 0) {
        res.json(resultado)
    } else {
        res.status(404).json({ mensaje: 'Producto con id ${ idProducto } no encontrado"'})
    }
}