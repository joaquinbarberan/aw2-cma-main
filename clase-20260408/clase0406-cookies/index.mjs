import express from 'express'
import cookieParser from 'cookie-parser'
const PUERTO = 3000

const app = express()
//avisamos a express que use coockie-parser
app.use(cookieParser('claveSecreta'))
//josn
app.use(express.json())
//URLCODE
app.use(express.urlencoded({extended:true}))
function chequearCoockie(req,res,next){
    //verifico si la cookie existe 
    const sesioniD = req.signedCookies['sesionID']
    //
    if (sesioniD === 'numeroSesion') {
        return next()
    }
    return res.redirect('/login')
}
//admin
app.use('/admin' , chequearCoockie,  express.static('./public/front-admin'))
//login
app.use('/login' ,   express.static('./public/front-login'))
//ruta que va a gestionar la autenticacion y acceso 
app.post('/autenticacion' , (req,res)=>{
    const {usuario , clave} = req.body
    //consultar a la BD si existe 
    if (usuario != 'admin' || clave !='123456') {
        return res.redirect('/login')
    }
    console.log (req.body)
    //const id =nano(id)
    //genera cabeceras para las cookies 
    res.cookie('sesionID' , 'numeroSesion' ,{
        signed:true,
        httponly:true,
        sameSite:'lax',
        secure: true, 
        maxAge: 1000 * 60 * 60 
    })
    res.redirect('/admin')
    //res.send('logueado')
})
app.listen(PUERTO)