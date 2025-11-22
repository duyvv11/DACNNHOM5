const { Doctor, Hospital, Specialization, User, DoctorSchedule } = require('../models');
const bcrypt = require('bcryptjs');
const specialization = require('../models/specialization');
const hospital = require('../models/hospital');

// lay ds bac si
exports.getDoctors = async (req, res) => {
  try {
    const docs = await Doctor.findAll({
      attributes: ['id','userid','experience_years', 'profile_image','title','license_image','workplace','work_hours','status'],
      include: [{
        model: Hospital,
        attributes: ['name', 'address', 'phone' ,'id']
      }, {
        model: Specialization,
        attributes: ['name', 'description' ,'id']
      }, {
        model: User,
        attributes: ['name', 'email', 'phone', 'address','id','age','gender']
      }]
    });
    res.json(docs);
  } catch (err) { res.status(500).json({ error: err.message }); }
};
// lay chi tiet
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({where:{ userId: req.params.id } ,
      attributes: ['id','userid','experience_years','title','workplace','work_hours','profile_image'],
      include: [{
        model: Hospital,
        attributes: ['name', 'address']
      },
      {
        model: Specialization,
        attributes: ['name']
      },
      {
        model:User,
        attributes:['name','age','gender','phone','email','address']
      },
      {
        model:DoctorSchedule,
        attributes:['dayOfWeek','startTime','endTime']
      }
      ]
    });

    if (!doctor) return res.status(404).json({ message: 'Không tìm thấy bác sĩ' });
    res.json(doctor);
  } catch (err) { res.status(500).json({ error: err.message }); }
};


// // lay bac si theo chuyen khoa 
// exports.getDoctorbySpecialization = async (req,res) =>{
//   try {
//     const id = req.params.id;
//     console.log("get bac si theo chuyen khoa",id);
//     const doctor = await Doctor.findAll({
//       where: { specializationId:id },
//       attributes: ['userid','experience_years', 'title', 'workplace', 'work_hours', 'profile_image'],
//       include: [{
//         model: Hospital,
//         attributes: ['name', 'address']
//       },
//       {
//         model: Specialization,
//         attributes: ['name' ,'id']
//       },
//       {
//         model: User,
//         attributes: ['name', 'age', 'gender', 'phone', 'email', 'address']
//       },
//       {
//         model: DoctorSchedule,
//         attributes: ['dayOfWeek', 'startTime', 'endTime']
//       }
//       ]
//     });

//     if (!doctor) return res.status(404).json({ message: 'Không tìm thấy bác sĩ' });
//     res.json(doctor);
//   } catch (err) { res.status(500).json({ error: err.message }); }
// };

// Thay đổi logic để tìm specializationId từ tên chuyên khoa
exports.getDoctorbySpecialization = async (req, res) => {
  try {
    // Lấy tên chuyên khoa từ query string (ví dụ: ?specialty=Khoa%20nhi)
    const specialtyName = req.query.specialty;

    if (!specialtyName) {
      return res.status(400).json({ message: 'Vui lòng cung cấp tên chuyên khoa.' });
    }

    // --- BƯỚC QUAN TRỌNG: TÌM ID DỰA TRÊN TÊN CHUYÊN KHOA ---
    const specialization = await Specialization.findOne({
      where: {
        // Sử dụng toán tử iLike (PostgreSQL) hoặc Collate (MySQL) cho tìm kiếm không phân biệt chữ hoa/thường 
        // hoặc đơn giản là tìm kiếm chính xác (tùy vào cấu hình DB của bạn)
        name: specialtyName
      },
      attributes: ['id'] // Chỉ cần lấy ID
    });

    if (!specialization) {
      // Trường hợp AI trả về tên không khớp với database
      return res.status(404).json({ message: `Không tìm thấy chuyên khoa: ${specialtyName}` });
    }

    // Lấy ID chuyên khoa
    const specializationId = specialization.id;
    console.log("Tìm bác sĩ theo ID chuyên khoa:", specializationId);

    // --- BƯỚC 2: TRUY VẤN DANH SÁCH BÁC SĨ BẰNG ID ---
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

// lay bác sĩ theo bệnh viện
exports.getDoctorbyHospital = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("get bac si theo benh vien", id);
    const doctor = await Doctor.findAll({
      where: { hospitalId: id },
      attributes: ['userid', 'experience_years', 'title', 'workplace', 'work_hours', 'profile_image'],
      include: [{
        model: Hospital,
        attributes: ['name', 'address']
      },
      {
        model: Specialization,
        attributes: ['name', 'id']
      },
      {
        model: User,
        attributes: ['name', 'age', 'gender', 'phone', 'email', 'address']
      },
      {
        model: DoctorSchedule,
        attributes: ['dayOfWeek', 'startTime', 'endTime']
      }
      ]
    });

    if (!doctor) return res.status(404).json({ message: 'Không tìm thấy bác sĩ' });
    res.json(doctor);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// tạo bsi và upate role user
exports.createDoctor = async (req, res) => {
  try {
    const { userId, ...rest } = req.body;
    // Tạo bác sĩ
    const doc = await Doctor.create({ ...rest, userId });

    const bt =await User.findOne({where:{id:userId}});
    await bt.update({role:"DOCTOR"});
    console.log(bt);

    res.status(201).json("Tạo và update thành công");

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//
exports.updateDoctor = async (req, res) => {
  try {
    console.log(req.body);
    const doc = await Doctor.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Không tìm thấy bác sĩ' });
    if (req.body.password) req.body.password = await bcrypt.hash(req.body.password, 10);
    await doc.update(req.body);
    res.json(doc);
  } catch (err) { res.status(400).json({ error: err.message }); }
};
// xóa bác sĩ
exports.deleteDoctor = async (req, res) => {
  try {
    const doc = await Doctor.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Không tìm thấy bác sĩ' });
    await doc.destroy();
    res.status(200).json({ message: 'Đã xóa bác sĩ' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
