const { Model } = require('sequelize');
const {Appointment, User, Doctor,Hospital } = require('../models');

const combineDateTime = (date, time) => {
  try {
    if (!date || !time) return null;

    const dateTimeString = `${date}T${time}:00+07:00`;

    // Tạo và trả về đối tượng Date
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

    if (!date || !startTime || !endTime || !patientId || !doctorId|| !scheduleId) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc: Ngày, giờ, ID bệnh nhân hoặc ID bác sĩ.' });
    }
    

    // tạo DateTime 
    const startDateTime = combineDateTime(date, startTime);
    const endDateTime = combineDateTime(date, endTime);
    const checkapoiment = await Appointment.findOne(
    { where: {patientId:patientId,
      startDateTime:startDateTime,
      endDateTime:endDateTime} }
    )
    if(checkapoiment){
      return res.status(409).json("bị trùng lịch");
    }
    console.log("",startDateTime,endDateTime)

    if (!startDateTime || !endDateTime) {
      return res.status(400).json({ message: 'Lỗi định dạng ngày/giờ.' });
    }

    const appt = await Appointment.create({
      startDateTime:startDateTime,
      endDateTime:endDateTime,
      patientId:patientId,
      doctorId:doctorId, 
      scheduleId:scheduleId
    });

    res.status(201).json(appt);
  } catch (err) {
    res.status(400).json({
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


exports.getAppointments = async (req, res) => {
  try {
    const appts = await Appointment.findAll({ include: [User, Doctor] });
    res.json(appts);
  } catch (err) { res.status(500).json({ error: err.message }); }
};


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
