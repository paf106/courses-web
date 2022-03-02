const express = require('express');
const webController = require('../controllers/webController');
const router = express.Router();

// Página inicial
router.get('/', webController.inicio);

// Página inicial
router.get('/sign-in', webController.signIn);

// Página inicial
router.get('/sign-up', webController.signUp);

module.exports = router;