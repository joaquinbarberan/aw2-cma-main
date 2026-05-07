// modulo HTTP
import http from 'node:http'
import fsp from 'node:fs/promises'
import path from 'node:path'


const app = http.createServer(async (peticion, respuesta) => {//-> esta funcion se va a ejecutar cuando haya una peticion o un request
    if (peticion.method === 'GET') {
        if (peticion.url === '/') {
            respuesta.statusCode = 200
            return respuesta.end('estas en la raiz')
        }



        if (peticion.url === '/usuarios') {
            try {
                const respuestaApi = await fetch('https://api.escuelajs.co/api/v1/users')
                const datosApi = await respuestaApi.text()
                await fsp.writeFile(path.join('./datosApi.json'), datosApi)
                respuesta.statusCode = 201
                respuesta.setHeader('content-type', 'application/json')
                return respuesta.end(datosApi)
            } catch (error) {
                respuesta.statusCode = 500
                return respuesta.end('recurso no encontrado')
            }
        }


        if (peticion.url === '/usuarios/filtrados') {
            try {
                const respuestaApi = await fetch('https://api.escuelajs.co/api/v1/users')
                const datosApi = await respuestaApi.json()//me va a devolver un json no un js 
                const arregloUsuarios = datosApi.filter((usuario)=>usuario.id < 10)
                // const words = ["spray", "elite", "exuberant", "destruction", "present"];

                // const result = words.filter((word) => word.length > 6);

                // console.log(result);
                //await fsp(path.join('./datosApi.'), datosApi)
                respuesta.statusCode = 201
                respuesta.setHeader('content-type', 'application/json')
                const jsonfinal = JSON.stringify(arregloUsuarios)
                respuesta.end(jsonfinal)



            } catch (error) {
                respuesta.statusCode = 500
                return respuesta.end('recurso no encontrado')
            }
        }



    }














    respuesta.statusCode = 404
    respuesta.end('recurso no encontrado')
})

app.listen(3000, () => {
    console.log('servidor corriendo en http://localhost:3000')
})