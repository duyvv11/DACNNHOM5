const db = require('../models');
const News  = db.News;

exports.getNews = async (req, res) => {
  try {
    const n = await News.findAll();
    res.json(n);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getNewsById = async (req, res) => {
  try {
    const n = await News.findByPk(req.params.id);
    if (!n) return res.status(404).json({ message: 'Không tìm thấy tin' });
    res.json(n);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createNews = async (req, res) => {
  try {
    const n = await News.create(req.body);
    res.status(201).json(n);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.updateNews = async (req, res) => {
  try {
    const n = await News.findByPk(req.params.id);
    if (!n) return res.status(404).json({ message: 'Không tìm thấy tin' });
    await n.update(req.body);
    res.json(n);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.deleteNews = async (req, res) => {
  try {
    const n = await News.findByPk(req.params.id);
    if (!n) return res.status(404).json({ message: 'Không tìm thấy tin' });
    await n.destroy();
    res.json({ message: 'Đã xóa tin' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
