//leer una api

try{
    //hacer una peticion con FECH -> con promesas
    const respuesta = await fetch('https://69cbcb780b417a19e07b42c1.mockapi.io/api/v1/Productos')
    //extraemos del cuerpo la peticion de datos 
    const productos = await respuesta.json() //<- transforma el cuerpo de cadena de texto a un objeto/arreglo de js
    console.log(productos)
}catch(e){
    console.log(e)
}