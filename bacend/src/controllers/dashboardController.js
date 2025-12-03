const { Appointment, User, Doctor, Hospital,Specialization } = require('../models');

exports.getAllEntityReview = async (req,res)=>{
  try {
    const hospitalCount = await Hospital.count();
    const specializationCount = await Specialization.count();
    const doctorCount = await Doctor.count();
    const userCount = await User.count();
    const appointmentCount = await Appointment.count();
    const appointmentDoneCount = await Appointment.count({
      where:{
        status:"DONE"
      }
    });
    const appointmentCancelledCount = await Appointment.count({
      where: {
        status: "CANCELLED"
      }
    });
    const appointmentPendingCount = await Appointment.count({
      where: {
        status: "PENDING"
      }
    });
    res.json({
      hospitalCount,
      specializationCount,
      doctorCount,
      appointmentCount,
      userCount,
      appointmentDoneCount,
      appointmentCancelledCount,
      appointmentPendingCount
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("lỗi sevrer");
  }
}

