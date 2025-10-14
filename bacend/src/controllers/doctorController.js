const { Doctor, Hospital, Specialization } = require('../models');
const bcrypt = require('bcryptjs');

exports.getDoctors = async (req, res) => {
  try {
    const docs = await Doctor.findAll({ include: [Hospital, Specialization] });
    res.json(docs);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doc = await Doctor.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Không tìm thấy bác sĩ' });
    res.json(doc);
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
