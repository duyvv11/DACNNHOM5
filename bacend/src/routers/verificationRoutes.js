const express = require('express');
const router = express.Router();
const verificationController = require('../controllers/verificationController');

router.get('/', verificationController.getVerifications);
router.post('/', verificationController.createVerification);
router.put('/:id', verificationController.updateVerification);
router.delete('/:id', verificationController.deleteVerification);

module.exports = router;
