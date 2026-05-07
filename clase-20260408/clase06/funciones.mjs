import productos from "./productos.mjs";

export function obtenerproductos(req, res) {
  res.json(productos);
}

export function obtenerproductosPorId(req, res) {
  //logica extra
  //filtramos
  const id_producto = Number(req.params.id); //->verifica  si es numero ->cast

  const productos_filtrados = productos.filter((producto) => {
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
  productos.push(nuevo_producto);
  const respuesta = {
    mensaje: "producto dado de alta",
  };
  res.status(201).json(respuesta);
}
export function EliminarproductosPorId(req, res) {
  //logica extra
  const id_producto = Number(req.params.id); //->verifica  si es numero ->cast

  //filtramos
  const productos_filtrados = productos.filter((producto) => {
    return id_producto !== Number(producto.id);
  });

  productos.length = 0;
  productos.push(...productos_filtrados);

  const respuesta = {
    mensaje: "producto eliminado",
  };
  res.json(respuesta);
}
