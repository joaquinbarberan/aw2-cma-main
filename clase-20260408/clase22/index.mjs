import express from 'express'

const  PUERTO = 3000
// instancia servidor express 
const app = express()


app.get('/',(req,res)=>{
    
    res.set('content-type','text/html')//cabecera 
    //mime types
    res.status(200)//codigo de estado 
    res.end('<h1>qonda con el get</h1>')// cuerpo -> contenido 
})
app.get('/materias',(req,res)=>{
    res.set('content-type','application/json')//cabecera 
    //mime types
    res.status(200)//codigo de estado 
    res.end(`
       {
        "materia 1 ": Base de datos
        "materia 2 ": Analisis de sistema
        "materia 3 ": App2
        "materia 4 ": Aw2
       }  
        `)


})
app.get('/licha',(req,res)=>{
    res.status(304)
    res.end('licha')
})
app.post('/',(req,res)=>{
    res.set('content-type','application/json')
    res.end('{"materia" : "AW2"}')
})

//abrir un puerto
app.listen(PUERTO, ()=>{
    console.log(`servisor corriendo en http://localhost${PUERTO}`)
})