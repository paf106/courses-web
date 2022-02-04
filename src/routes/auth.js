const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Formulario de login
router.post('/sign-in', authController.signIn);

// Formulario de registro
router.post('/sign-up', authController.signUp);

// Logout
router.get('/logout', authController.logout);

module.exports = router;