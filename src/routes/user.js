const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Seleccionar todos los usuarios
router.get('/users', userController.getUsers);

// Seleccionar usuario por id
router.get('/user/:idUser', userController.getUserById);

// Eliminar usuario por id
router.get('/user/delete/:idUser', userController.deleteUserById);

// Editar usuario por id
router.post('/user/edit/:idUser', userController.editUserById);

// Crear usuario
router.post('/user/create', userController.createUser);

// Login usuario
router.post('/user/login', userController.userLogin);

// Cambiar contraseña
router.post('/user/password', userController.changeUserPassword);

module.exports = router;