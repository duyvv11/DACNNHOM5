const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // đường dẫn đúng của bạn

router.post('/login', authController.login);

module.exports = router;
