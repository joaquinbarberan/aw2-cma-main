import express from 'express'
import path from 'node:path'
const PUERTO = 3000

const app = express()

//levantamos la web estatica 
console.log(path.resolve('front'))
app.use('/front', express.static(path.resolve('front')))

app.listen(PUERTO, () => {
    console.log(`http://localhost:${PUERTO}`)
})
