const { Appointment, User, Doctor } = require('../models');

exports.createAppointment = async (req, res) => {
  try {
    const appt = await Appointment.create(req.body);
    res.status(201).json(appt);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.getAppointments = async (req, res) => {
  try {
    const appts = await Appointment.findAll({ include: [User, Doctor] });
    res.json(appts);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const appt = await Appointment.findByPk(req.params.id, { include: [User, Doctor] });
    if (!appt) return res.status(404).json({ message: 'Không tìm thấy cuộc hẹn' });
    res.json(appt);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findByPk(req.params.id);
    if (!appt) return res.status(404).json({ message: 'Không tìm thấy cuộc hẹn' });
    await appt.update(req.body);
    res.json(appt);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findByPk(req.params.id);
    if (!appt) return res.status(404).json({ message: 'Không tìm thấy cuộc hẹn' });
    await appt.destroy();
    res.json({ message: 'Đã xóa cuộc hẹn' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
