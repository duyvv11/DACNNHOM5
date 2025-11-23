const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.get('/', doctorController.getDoctors);
router.get('/:id', doctorController.getDoctorById);
router.post('/', doctorController.createDoctor);
router.put('/:id', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);
router.get('/doctorbyspe/dtc', doctorController.getDoctorbySpecialization);
router.get('/doctorbyspecialty/:id', doctorController.getDoctorbySpecializationById);
router.get('/doctorbyhospital/:id',doctorController.getDoctorbyHospital);
module.exports = router;
