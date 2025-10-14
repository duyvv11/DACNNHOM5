const Verification = require('../models/verification');
const Doctor = require('../models/doctor');
const Appointment = require('../models/appointment');


exports.getVerifications = async (req, res) => {
  try {
    const v = await Verification.findAll({ include: [Doctor, Appointment] });
    res.json(v);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createVerification = async (req, res) => {
  try {
    const v = await Verification.create(req.body);
    res.status(201).json(v);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.updateVerification = async (req, res) => {
  try {
    const v = await Verification.findByPk(req.params.id);
    if (!v) return res.status(404).json({ message: 'Không tìm thấy verification' });
    await v.update(req.body);
    res.json(v);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.deleteVerification = async (req, res) => {
  try {
    const v = await Verification.findByPk(req.params.id);
    if (!v) return res.status(404).json({ message: 'Không tìm thấy verification' });
    await v.destroy();
    res.json({ message: 'Đã xóa verification' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
