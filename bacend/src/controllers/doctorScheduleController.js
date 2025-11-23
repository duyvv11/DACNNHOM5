const { DoctorSchedule, Doctor ,Appointment} = require('../models');
const { Op } = require('sequelize');
const generateDoctorDates = require("./generateDoctorDates");
const moment = require("moment");
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
    const schedules = await DoctorSchedule.findAll({
      include:[
        {
          model:Doctor,
          where:{
            userId: req.params.doctorId
          }
        }
      ]
    });
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSchedule = async (req, res) => {
  try {
    const { userId, dayOfWeek, startTime, endTime, isAvailable } = req.body;

    // 1. Tìm doctor theo userId (vì login dùng userId)
    const doctor = await Doctor.findOne({
      where: { userId: userId }
    });

    if (!doctor) {
      return res.status(404).json({ error: "Không tìm thấy bác sĩ với userId này" });
    }

    // 2. Tạo lịch đúng với doctorId thật
    const newSchedule = await DoctorSchedule.create({
      doctorId: doctor.id,  // dùng ID bác sĩ thật
      dayOfWeek,
      startTime,
      endTime,
      isAvailable
    });

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


// //
// exports.getScheduleDate =async (req, res) => {
//   try {
//     const doctorId = req.params.id;

//     const schedules = await DoctorSchedule.findAll({
//       where: { doctorId },
//       raw: true,
//     });

//     const availableDays = generateDoctorDates(schedules, 30);

//     res.json({ doctorId, availableDays });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Lỗi server" });
//   }
// };
exports.getScheduleDate = async (req, res) => {
  try {
    const doctorId = req.params.id;

    // ren 30 ngay
    const today = moment().startOf('day').toDate(); 
    const futureDate = moment().add(30, 'days').endOf('day').toDate(); 

    // tải tất cả doctorschedules
    const schedules = await DoctorSchedule.findAll({
      where: { doctorId },
      raw: true,
    });

    // tải cuộc hẹn không bị hủy vì ch hủy để hiện lại cho ng khác
    const bookedAppointments = await Appointment.findAll({
      where: {
        doctorId,
        status: {
          [Op.ne]: 'CANCELLED' 
        },
        startDateTime: {
          [Op.between]: [today, futureDate]
        }
      },
      attributes: ['id', 'scheduleId', 'startDateTime'], 
      raw: true,
    });

    const availableDays = generateDoctorDates(schedules, 30, bookedAppointments);

    res.json({ doctorId, availableDays });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi server" });
  }
};