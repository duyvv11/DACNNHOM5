const { Model } = require('sequelize');
const {Appointment, User, Doctor,Hospital } = require('../models');

const combineDateTime = (date, time) => {
  try {
    if (!date || !time) return null;

    // nếu time đã có giây giữ nguyên
    const cleanTime = time.length === 5 ? `${time}:00` : time;

    const dateTimeString = `${date}T${cleanTime}+07:00`;
    return new Date(dateTimeString);
  } catch (e) {
    console.error("Lỗi khi kết hợp ngày giờ:", e);
    return null;
  }
};


// tạo lịch hẹn
exports.createAppointment = async (req, res) => {
  console.log("gọi api đặt lịch");
  try {
    const { date, startTime, endTime, patientId, doctorId, scheduleId } = req.body;
    console.log(date, startTime, endTime, patientId, doctorId, scheduleId);

    if (!date || !startTime || !endTime || !patientId || !doctorId || !scheduleId) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc.' });
    }

    const startDateTime = combineDateTime(date, startTime);
    const endDateTime = combineDateTime(date, endTime);

    console.log("date khi chuyen", startDateTime, endDateTime);

    if (!startDateTime || !endDateTime || isNaN(startDateTime)) {
      return res.status(400).json({ message: 'Ngày hoặc giờ không hợp lệ.' });
    }

    // check trùng lịch
    const existing = await Appointment.findOne({
      where: {
        patientId,
        startDateTime: startDateTime
      }
    });

    if (existing && existing.status !== "CANCELLED") {
      return res.status(409).json("bị trùng lịch");
    }

    const appt = await Appointment.create({
      startDateTime,
      endDateTime,
      patientId,
      doctorId,
      scheduleId
    });

    return res.status(201).json(appt);

  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: 'Không thể đặt lịch',
      details: err.message
    });
  }
};


// lấy lịch hẹn theo nguoif dùng
exports.getAllAppointmentsById= async (req,res) =>{
  try {
    const id = req.params.id;
    const appointments = await Appointment.findAll({where:{patientId:id},
      include:[
        {
          model:User,
          attributes:["id","name","age","gender","email","phone","address"]
        },
        {
          model:Doctor,
          attributes:["id","workplace"],
          include:[
            {
              model: User,
              attributes: ["id", "name", "age", "gender", "email", "phone", "address"]
            },
            {
              model: Hospital,
              attributes: ["id","name","address"]
            }
          ]
        }
        ]})
    if(!appointments){
      return res.status(200).json({msg:"rỗng",appointments});
    }
    return res.status(200).json({msg:"thanh cong",appointments})
    
  } catch (error) {
    return res.status(500).json({msg:"lỗi sever",error:error.message});
    
  }
}

// lấy lịch hẹn theo bác sĩ
exports.getAllAppointmentsByDoctorId = async (req, res) => {
  try {
    const id = req.params.id;
    const appointments = await Appointment.findAll({
      include: [
        {
          model: Doctor,
          attributes: ["id"],
          where:{userId:id},
          include:[
            {
              model:Hospital,
              attributes:["name"]
            }
          ]
        },
        {
          model:User,
          attributes:["name"]
        }
      ]
    })
    if (!appointments) {
      return res.status(200).json({ msg: "rỗng", appointments });
    }
    return res.status(200).json({ msg: "thanh cong lay danh sachkkkk", appointments })

  } catch (error) {
    return res.status(500).json({ msg: "lỗi sever", error: error.message });

  }
}

// lấy danh sách lịch hẹn
exports.getAppointments = async (req, res) => {
  try {
    const appts = await Appointment.findAll({ include: [User, Doctor] });
    res.json(appts);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// lấy chi tiết lịch hẹn
exports.getAppointmentById = async (req, res) => {
  try {
    const appt = await Appointment.findByPk(req.params.id, { include: [User, Doctor] });
    if (!appt) return res.status(404).json({ message: 'Không tìm thấy cuộc hẹn' });
    res.json(appt);
  } catch (err) { res.status(500).json({ error: err.message }); }
};


// cập nhật lịch hẹn
exports.updateAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findByPk(req.params.id);
    if (!appt) return res.status(404).json({ message: 'Không tìm thấy cuộc hẹn' });
    await appt.update(req.body);
    res.json(appt);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findByPk(req.params.id);
    if (!appt) return res.status(404).json({ message: 'Không tìm thấy cuộc hẹn' });
    await appt.destroy();
    res.json({ message: 'Đã xóa cuộc hẹn' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
