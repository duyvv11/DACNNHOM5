const { Specialization ,Doctor} = require('../models/');

exports.getSpecializations = async (req, res) => {
  try {
    const data = await Specialization.findAll();
    res.json(data);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getSpecializationsbyID = async (req,res) =>{
  try {
    const id = req.params.id;
    console.log(id)
    const data = await Specialization.findByPk(id);
    if(!data){
      console.log("lỗi");
      res.status(404).json({msg:"không có chuyên khoa này"})
    }
    else{
      console.log("nhận");
      res.status(200).json({ msg: "ham lay sp by id", data: data });
    }
    
    
  } catch (error) {
    res.status(500).json({msg:"lỗi serve",error:error.message});
  }
}

exports.createSpecialization = async (req, res) => {
  try {
    const s = await Specialization.create(req.body);
    res.status(201).json(s);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.updateSpecialization = async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  try {
    const s = await Specialization.findByPk(req.params.id);
    if (!s) return res.status(404).json({ message: 'Không tìm thấy chuyên khoa' });
    await s.update(req.body);
    res.status(200).json(s);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.deleteSpecialization = async (req, res) => {
  try {
    const s = await Specialization.findByPk(req.params.id);
    if (!s) return res.status(404).json({ message: 'Không tìm thấy chuyên khoa' });
    await s.destroy();
    res.json({ message: 'Đã xóa chuyên khoa' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// tím bác sĩ dựa vào tên chuyên khoa
exports.getDoctorbySpecialization = async (req, res) => {
  try {
    // Lấy tên chuyên khoa từ query string (ví dụ: ?specialty=Khoa%20nhi)
    const specialtyName = req.query.specialty;

    if (!specialtyName) {
      return res.status(400).json({ message: 'Vui lòng cung cấp tên chuyên khoa.' });
    }

    const specialization = await Specialization.findOne({
      where: {
        name: specialtyName
      },
      attributes: ['id'] 
    });

    if (!specialization) {
      return res.status(404).json({ message: `Không tìm thấy chuyên khoa: ${specialtyName}` });
    }

    // Lấy ID chuyên khoa
    const specializationId = specialization.id;
    console.log("Tìm bác sĩ theo ID chuyên khoa:", specializationId);

    const doctor = await Doctor.findAll({
      where: { specializationId: specializationId }, // Sử dụng ID đã tìm được
      attributes: ['userId', 'experience_years', 'title', 'workplace', 'work_hours', 'profile_image'],
      include: [
        // ... (giữ nguyên phần include: Hospital, Specialization, User, DoctorSchedule)
        { model: Hospital, attributes: ['name', 'address'] },
        { model: Specialization, attributes: ['name', 'id'] },
        { model: User, attributes: ['name', 'age', 'gender', 'phone', 'email', 'address'] },
        { model: DoctorSchedule, attributes: ['dayOfWeek', 'startTime', 'endTime'] }
      ]
    });

    if (!doctor || doctor.length === 0) return res.status(404).json({ message: 'Không tìm thấy bác sĩ nào trong chuyên khoa này' });
    res.json(doctor);
  } catch (err) { res.status(500).json({ error: err.message }); }
};