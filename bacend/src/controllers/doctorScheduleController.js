const { DoctorSchedule, Doctor } = require('../models');
const generateDoctorDates = require("./generateDoctorDates");
// Lấy tất cả lịch khám
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await DoctorSchedule.findAll({ include: Doctor });
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy lịch theo ID
exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await DoctorSchedule.findByPk(req.params.id, { include: Doctor });
    if (!schedule) return res.status(404).json({ message: "Không tìm thấy lịch" });
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy lịch theo bác sĩ
exports.getSchedulesByDoctor = async (req, res) => {
  try {
    const schedules = await DoctorSchedule.findAll({ where: { doctorId: req.params.doctorId } });
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tạo lịch mới
exports.createSchedule = async (req, res) => {
  try {
    const { doctorId, dayOfWeek, startTime, endTime, isAvailable } = req.body;
    const newSchedule = await DoctorSchedule.create({ doctorId, dayOfWeek, startTime, endTime, isAvailable });
    res.status(201).json(newSchedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật lịch
exports.updateSchedule = async (req, res) => {
  try {
    const schedule = await DoctorSchedule.findByPk(req.params.id);
    if (!schedule) return res.status(404).json({ message: "Không tìm thấy lịch" });

    const { doctorId, dayOfWeek, startTime, endTime, isAvailable } = req.body;
    await schedule.update({ doctorId, dayOfWeek, startTime, endTime, isAvailable });
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa lịch
exports.deleteSchedule = async (req, res) => {
  try {
    const schedule = await DoctorSchedule.findByPk(req.params.id);
    if (!schedule) return res.status(404).json({ message: "Không tìm thấy lịch" });

    await schedule.destroy();
    res.json({ message: "Đã xóa lịch" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getScheduleDate =async (req, res) => {
  try {
    const doctorId = req.params.id;

    const schedules = await DoctorSchedule.findAll({
      where: { doctorId },
      raw: true,
    });

    const availableDays = generateDoctorDates(schedules, 30);

    res.json({ doctorId, availableDays });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi server" });
  }
};