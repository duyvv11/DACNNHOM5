const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
// console.log('appointmentController:', appointmentController);

router.post('/', appointmentController.createAppointment);
router.get('/', appointmentController.getAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.put('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);
router.get("/user/:id",appointmentController.getAllAppointmentsById);
router.get("/doctor/:id", appointmentController.getAllAppointmentsByDoctorId);

module.exports = router;
