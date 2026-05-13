import productos from "../../productos.mjs";

export function obtenerTodos() {
    //haria una consulta a una base de datos
    return productos
}

export function obtenerUno(req,res) {
    const id_producto = Number(req.params.id); //->verifica  si es numero ->cast

    const productos_filtrados = productos.datos.filter((producto) => {
        return id_producto === Number(producto.id);
    });

    if (productos_filtrados.length > 0) {
        res.json(productos_filtrados);
    } else {
        const respuesta = {
            mensaje: "producto no encontrado",
        };
        res.status(404).json(respuesta);
    }
}