const User = require('../models/User');
const conn = require('../db');

// Seleccionar todos los usuarios
exports.getUsers = (req, res) => {

    conn.query(`select * from users`, (err, data) => {
        if (!err) {
            res.render("index", { users: data });
        }
    })

}

// Seleccionar usuario por id
exports.getUserById = (req, res) => {

    let idUser = req.params.idUser;

}

// Eliminar usuario por id
exports.deleteUserById = (req, res) => {

    let idUser = req.params.idUser;

    conn.query(`delete from users where idUser = ${idUser}`, (err, data) => {
        if (!err) {
            res.render("index");
        }
    })

}

// Editar usuario por id
exports.editUserById = (req, res) => {

    const idUser = req.body.idUser;
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const email = req.body.email;

    conn.query(`UPDATE users set nombre = ${nombre}, telefono = ${telefono} , email = ${email} WHERE idUser = ${idUser}`, (err, rows) => {

        if (!err) {

            res.render("index");
        } else {

            console.log(err);
        }
    });

}

// Crear usuario
exports.createUser = (req, res) => {

}

// Login usuario
exports.userLogin = (req, res) => {

}

// Cambiar contraseña
exports.changeUserPassword = (req, res) => {

}
