const  Hospital = require('../models/hospital');

exports.getHospitals = async (req, res) => {
  try {
    const data = await Hospital.findAll();
    res.json(data);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createHospital = async (req, res) => {
  try {
    const h = await Hospital.create(req.body);
    res.status(201).json(h);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.updateHospital = async (req, res) => {
  try {
    const h = await Hospital.findByPk(req.params.id);
    if (!h) return res.status(404).json({ message: 'Không tìm thấy bệnh viện' });
    await h.update(req.body);
    res.json(h);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.deleteHospital = async (req, res) => {
  try {
    const h = await Hospital.findByPk(req.params.id);
    if (!h) return res.status(404).json({ message: 'Không tìm thấy bệnh viện' });
    await h.destroy();
    res.json({ message: 'Đã xóa bệnh viện' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};


