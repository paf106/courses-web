const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conn = require('../db');
const Alerta = require('../Alerta');

/**
 * Genera un token y lo almacena en una cookie con el nombre "jwt"
 * @param obj Objeto para firmar el token
 * @param res response usada para almacenar la cookie en el navegador
 */
function generateToken(obj, res) {
    const token = jwt.sign({ id: obj }, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
    res.cookie('jwt', token, { expire: new Date() + process.env.JWT_EXPIRES_COOKIE_TIME });
}


exports.validateToken = (req, res, next) => {
    let token = req.cookies.jwt;
    if (typeof token != "undefined") {

        jwt.verify(token, process.env.JWT_KEY, (err, data) => {
            if (!err) {
                // Token válido
                next();
            } else {
                // Token expirado
                res.send("Token expirado o erróneo");
            }
        })
    } else {
        // No hay token
        res.status(401).render("401");
    }
}

// Login
exports.signIn = (req, res) => {

    const usuario = req.body.usuario;
    const password = req.body.password;

    // Verificamos si existe el usuario
    conn.query(`SELECT * FROM usuarios WHERE usuario = '${usuario}'`, async (err, rows) => {
        if (!err) {
            if (rows.length != 0) {
                if (await bcryptjs.compare(password, rows[0].password)) {
                    // Usuario autenticado
                    generateToken(rows[0].idUsuario, res);
                    res.redirect("/admin-inscripciones");
                } else {
                    // Contraseña no válida
                    res.render("login", Alerta.createAlert("Usuario o contraseña no válido", "error", "login"));
                }
            } else {
                // Usuario no encontrado
                res.render("login", Alerta.createAlert("Usuario o contraseña no válido", "error", "login"));
            }
        } else {
            // Error con la bd
            res.render("login", Alerta.createAlert("Error de conexión", "error", "login"));
        }
    })
}

// Logout
exports.logout = (req, res) => {
    res.clearCookie("jwt");
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.redirect("/");
};

// Registro
exports.signUp = (req, res) => {

    const usuario = req.body.usuario;
    const password = req.body.password;

    // Antes de registrar, comprobamos si existe el usuario
    conn.query(`SELECT usuario FROM usuarios WHERE usuario = '${usuario}'`, async (err, rows) => {
        if (!err) {
            if (rows.length == 0) {

                const hashedPassword = await bcryptjs.hash(password, 10);

                conn.query(`INSERT INTO usuarios (usuario, password) VALUES ('${usuario}', '${hashedPassword}')`, (err, rows) => {
                    if (!err) {
                        // Registramos al usuario
                        res.render("registro", Alerta.createAlert("Te has registrado correctamente", "success", "login"));

                    } else {
                        console.log(err);
                    }
                });

            } else {
                // Usuario ya existe
                res.render("registro", Alerta.createAlert("Este usuario ya está en uso", "info", "registro"));
            }

        } else {
            // Error con la bd
            res.render("registro", Alerta.createAlert("Error de conexión", "error", "registro"));
        }
    });
}