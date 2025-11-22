const db = require('../models')
const Hospital = db.Hospital;
// lay ds benh vien
exports.getHospitals = async (req, res) => {
  try {
    const data = await Hospital.findAll();
    res.json(data);
  } catch (err) { res.status(500).json({ error: err.message }); }
};
// lay chi tiet
exports.getHospitalbyId = async (req,res) =>{
  try {
    const id = req.params.id;
    const hospital = await Hospital.findByPk(id);
    res.json(hospital);
  } catch (error) {
    res.status(500).json("lỗi server",error.message);
    
  }
}
// them moi
exports.createHospital = async (req, res) => {
  try {
    const h = await Hospital.create(req.body);
    res.status(201).json(h);
  } catch (err) { res.status(400).json({ error: err.message }); }
};
// cap nhat
exports.updateHospital = async (req, res) => {
  try {
    const h = await Hospital.findByPk(req.params.id);
    if (!h) return res.status(404).json({ message: 'Không tìm thấy bệnh viện' });
    await h.update(req.body);
    res.status(200).json(h);
  } catch (err) { res.status(400).json({ error: err.message }); }
};
// xoa
exports.deleteHospital = async (req, res) => {
  try {
    const h = await Hospital.findByPk(req.params.id);
    if (!h) return res.status(404).json({ message: 'Không tìm thấy bệnh viện' });
    await h.destroy();
    res.json({ message: 'Đã xóa bệnh viện' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};


