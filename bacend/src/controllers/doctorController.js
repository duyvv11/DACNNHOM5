const { Doctor, Hospital, Specialization, User, DoctorSchedule } = require('../models');
const bcrypt = require('bcryptjs');
const specialization = require('../models/specialization');
const hospital = require('../models/hospital');

exports.getDoctors = async (req, res) => {
  try {
    const docs = await Doctor.findAll({
      attributes: ['id','userid','experience_years', 'profile_image'],
      include: [{
        model: Hospital,
        attributes: ['name', 'address', 'phone']
      }, {
        model: Specialization,
        attributes: ['name', 'description']
      }, {
        model: User,
        attributes: ['name', 'email', 'phone', 'address']
      }]
    });
    res.json(docs);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

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


// lay bac si theo chuyen khoa 
exports.getDoctorbySpecialization = async (req,res) =>{
  try {
    const id = req.params.id;
    console.log("get bac si theo chuyen khoa",id);
    const doctor = await Doctor.findAll({
      where: { specializationId:id },
      attributes: ['userid','experience_years', 'title', 'workplace', 'work_hours', 'profile_image'],
      include: [{
        model: Hospital,
        attributes: ['name', 'address']
      },
      {
        model: Specialization,
        attributes: ['name' ,'id']
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
exports.createDoctor = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashed = password ? await bcrypt.hash(password, 10) : null;
    const doc = await Doctor.create({ ...rest, password: hashed });
    res.status(201).json(doc);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.updateDoctor = async (req, res) => {
  try {
    const doc = await Doctor.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Không tìm thấy bác sĩ' });
    if (req.body.password) req.body.password = await bcrypt.hash(req.body.password, 10);
    await doc.update(req.body);
    res.json(doc);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const doc = await Doctor.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Không tìm thấy bác sĩ' });
    await doc.destroy();
    res.json({ message: 'Đã xóa bác sĩ' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
