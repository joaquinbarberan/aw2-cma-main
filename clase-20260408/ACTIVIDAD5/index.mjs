import './iniciar.env.mjs'
import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from './conexion.bd.mjs';

const PUERTO = process.env.PUERTO || 3000;

const app = express();

// Middleware que se ejecuta antes de entrar al admin
function comprobarToken(req, res, next) {
    const token = req.signedCookies['token']
    jwt.verify(token, process.env.FIRMA_JWT, (error, PayLoad) => {
        // Si el token no es válido lo mandamos a login, sino next
        if (error) return res.redirect('/login')
        console.log(PayLoad)
        next()
    })
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.FIRMA_COOKIE));

// POST /registrar → hashea la contraseña y guarda el usuario en la BD
app.post('/registrar', async (req, res) => {
    const { usuario, pass } = req.body;
    if (!usuario || !pass) {
        return res.sendStatus(400);
    }
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashingPass = bcrypt.hashSync(pass, salt);
        const resultado = await pool.query(
            'INSERT INTO usuarios (usuario, password_hash) VALUES ($1, $2)',
            [usuario, hashingPass]
        );
        if (resultado.rowCount > 0) {
            res.redirect('/login');
        } else {
            res.sendStatus(500);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// POST /autenticar → consulta el usuario en la BD, compara la clave y genera el JWT
app.post('/autenticar', async (req, res) => {
    const { usuario, pass } = req.body;

    try {
        // Consultar a la BD por nombre de usuario y obtener el hash de la clave
        const resultado = await pool.query(
            'SELECT password_hash FROM usuarios WHERE username = $1',
            [usuario]
        );

        // Si el usuario no existe
        if (resultado.rowCount === 0) {
            return res.redirect('/login');
        }

        const { password_hash } = resultado.rows[0];

        // Comparar la clave enviada con el hash de la BD usando bcrypt.compare
        const claveValida = await bcrypt.compare(pass, password_hash);

        if (!claveValida) {
            return res.redirect('/login');
        }

        // Usuario válido → generar JWT con los datos del payload
        const DatosPayLoad = {
            usuario: usuario,
            rol: 0
        }

        jwt.sign(DatosPayLoad, process.env.FIRMA_JWT, { expiresIn: '1h' }, (error, token) => {
            if (error) return res.redirect('/login')

            // Enviar token via cookie firmada
            res.cookie('token', token, {
                sameSite: 'lax',
                httpOnly: true,
                secure: false, // cambiar a true si usás HTTPS
                signed: true
            })
            return res.redirect('/admin')
        })

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// /admin → ruta protegida por middleware que verifica el JWT
app.use('/admin', comprobarToken, express.static('./fronts/front-admin'))

// /login → sirve el formulario de login
app.use('/login', express.static('./fronts/front-login'))

// /registro → sirve el formulario de registro
app.use('/registro', express.static('./fronts/front-registro'))

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
