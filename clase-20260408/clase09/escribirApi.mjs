//leer una api
import fsp from 'node:fs/promises'
import path from 'node:path'
try{
    //hacer una peticion con FECH -> con promesas
    const respuesta = await fetch('https://api.escuelajs.co/api/v1/users')
    //extraemos del cuerpo la peticion de datos 
    const productos = await respuesta.json() //<- transforma el cuerpo de cadena de texto a un objeto/arreglo de js

    // seleccionamos solo los campos requeridos
    const filtrados = productos.map(p => ({
        id: p.id,
        email: p.email,
        name: p.name
    }))

    //creamos la ruta 
    const ruta = path.join('./api.json')
    //guardar los datos de un archivo (formateado)
    const contenido = JSON.stringify(filtrados, null, 4)
    await fsp.writeFile(ruta, contenido)

    //leer desde el JSON y mostrar en consola
    const leido = await fsp.readFile(ruta, 'utf-8')
    const datosGuardados = JSON.parse(leido)
    console.log(datosGuardados)

}catch(e){
    console.log(e)
}