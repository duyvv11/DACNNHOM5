const  User  = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Không tìm thấy user' });
    res.json(user);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashed = password ? await bcrypt.hash(password, 10) : null;
    const user = await User.create({ ...rest, password: hashed });
    res.status(201).json(user);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Không tìm thấy user' });
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    await user.update(req.body);
    res.json(user);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Không tìm thấy user' });
    await user.destroy();
    res.json({ message: 'Đã xóa user' });
  } catch (err) { res.status(500).json({ error: err.message }); }
  };
  
