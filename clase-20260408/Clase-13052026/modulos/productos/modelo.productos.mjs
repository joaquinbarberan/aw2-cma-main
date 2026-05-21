import pool from '../../conexion.bd.mjs'

export async function obtenerTodos(){
    /* Haria una consulta a una BD */
    const resultado = await pool.query( 'SELECT * FROM productos')
    console.log(resultado)
    return resultado.rows

}

export async function obtenerUno(id){
    const resultado = await pool.query('SELECT * FROM productos WHERE id=$1 ' , [id]) 
    return resultado.rows   
}

export async function EliminarUno(id){
    const resultado = await pool.query('DELETE  FROM productos WHERE id=$1 ' , [id]) 
    console.log(resultado)
    return resultado.rows   
}