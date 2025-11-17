const express = require('express');
const router = express.Router();
const specializationController = require('../controllers/specializationController');

router.get('/', specializationController.getSpecializations);
router.post('/', specializationController.createSpecialization);
router.put('/:id', specializationController.updateSpecialization);
router.delete('/:id', specializationController.deleteSpecialization);
router.get("/:id" ,specializationController.getSpecializationsbyID);

module.exports = router;
