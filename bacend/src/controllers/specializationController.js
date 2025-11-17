const { Specialization } = require('../models/');

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
  try {
    const s = await Specialization.findByPk(req.params.id);
    if (!s) return res.status(404).json({ message: 'Không tìm thấy chuyên khoa' });
    await s.update(req.body);
    res.json(s);
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
