import productos from "./productos.mjs";

export function obtenerproductos(req, res) {
  res.json(productos.datos);
}

export function obtenerproductosPorId(req, res) {
  //logica extra
  //filtramos
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

export function Altaproductos(req, res) {
  //logica extra
  const nuevo_producto = req.body;
  const proximoID = Number(productos.ultimo_id) + 1
  //agregar propiedad  ID
  nuevoProducto.id = proximoID
  //actualizar la referencia 
  productos.ultimo_id = proximoID

  productos.datos.push(nuevo_producto);
  const respuesta = {
    mensaje: "producto dado de alta",
  };
  res.status(201).json(respuesta);
}

export function modificarproducto(req, res) {
  const id_producto = Number(req.params.id)
  const productoAlta = req.body

  productos.datos.forEach((producto) => {
    //obteniendo el indice con indexOf
    const indice = productos.datos.indexOf(producto)

    if (id_producto === Number(producto.id)) {
      productoAlta.id = id_producto
      productos.datos[indice] = productoAlta
    }
    })
    const respuesta = {
      mensaje: 'producto cambiado'  +  id_producto
    };
    res.status(201).json(respuesta);

}








export function EliminarproductosPorId(req, res) {
  //logica extra
  const id_producto = Number(req.params.id); //->verifica  si es numero ->cast

  //filtramos
  const productos_filtrados = productos.datos.filter((producto) => {
    return id_producto !== Number(producto.id);
  });

  productos.datos.length = 0;
  productos.datos.push(...productos_filtrados);

  const respuesta = {
    mensaje: "producto eliminado",
  };
  res.json(respuesta);
}
