
try{
    const respuesta = await fetch('https://api.escuelajs.co/api/v1/users')
    const productos = await respuesta.json() //<- transforma el cuerpo de cadena de texto a un objeto/arreglo de js
    console.log(productos)
}catch(e){
    console.log(e)
}