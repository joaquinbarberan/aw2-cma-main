// modulo HTTP
import http from 'node:http'
import fsp from 'node:fs/promises'
import path from 'node:path'

const app = http.createServer(async(peticion, respuesta)=>{//-> esta funcion se va a ejecutar cuando haya una peticion o un request
    //console.log('peticion recibida')
    //console.log(peticion.url)
    
    
    if (peticion.method === 'GET') {
    
        
        
        if (peticion.url ==='/') {
            respuesta.statusCode = 200
            return respuesta.end('estas en la raiz')
        }
        
        if (peticion.url === '/suma') {
            respuesta.statusCode = 200
            const resultado = (5+3).toString() 
            return respuesta.end(resultado)
        }
        
    }
    if (peticion.method === 'POST') {
        //if (peticion.url === '/procesoform') {  
            //respuesta.on('data',(datos)=>{
               // console.log('post')
            //}
            //return respuesta.end('se hizo una peticion con el verbo POST')
        //}
        if (peticion.url === '/guardardatos') {
            const respuestaApi = await  fetch('https://api.escuelajs.co/api/v1/users')
            const datosApi = await respuestaApi.text()
            try{
                await fsp.writeFile(path.join('./datosApi.txt'),datosApi)
                respuesta.statusCode = 201
                return respuesta.end('datos guardados')
            }catch(error){
                respuesta.statusCode = 500
                return respuesta.end ('error en el servidor')
            }
        }
        
    }
        //fallback
        respuesta.statusCode = 404
        respuesta.end('recurso no encontrado')   
    })

app.listen(3000,()=>{
    console.log('servidor corriendo en http://localhost:3000')
})  