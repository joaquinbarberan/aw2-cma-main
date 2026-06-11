import jwt from 'jsonwebtoken'

//sign -> firmar 
//verify -> verificar 
const DatosPayLoad =  {
    usuario : 'andres',
    rol : 0 
}
        jwt.sign(DatosPayLoad , 'fraseSuperSecreta' ,{expiresIn: '1h'} ,(error,token)=>{
        if (error) return console.log(error)
            console.log(token)
    })