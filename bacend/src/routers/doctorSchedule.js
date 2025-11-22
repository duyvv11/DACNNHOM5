const express = require('express');
const router = express.Router();
const doctorScheduleController = require('../controllers/doctorScheduleController');


router.get('/', doctorScheduleController.getAllSchedules);
router.get('/:id', doctorScheduleController.getScheduleById);
router.get('/schedulebydoctor/:doctorId', doctorScheduleController.getSchedulesByDoctor);
router.post('/', doctorScheduleController.createSchedule);
router.put('/:id', doctorScheduleController.updateSchedule);
router.delete('/:id', doctorScheduleController.deleteSchedule);
router.get("/:id/available-days",doctorScheduleController.getScheduleDate);
module.exports = router;
