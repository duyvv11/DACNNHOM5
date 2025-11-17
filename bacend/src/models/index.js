const sequelize = require('../config/db');
const { Sequelize , DataTypes } = require('sequelize');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require("./user")(sequelize, DataTypes);
db.Doctor = require("./doctor")(sequelize, DataTypes);
db.Hospital = require("./hospital")(sequelize, DataTypes);
db.Specialization = require("./specialization")(sequelize, DataTypes);
db.Appointment = require("./appointment")(sequelize, DataTypes);
db.Verification = require("./verification")(sequelize, DataTypes);
db.News = require("./news")(sequelize, DataTypes);
db.DoctorSchedule = require("./DoctorSchedule")(sequelize, DataTypes);


// Bệnh viện - Bác sĩ (1-n)
db.Hospital.hasMany(db.Doctor, { foreignKey: "hospitalId" });
db.Doctor.belongsTo(db.Hospital, { foreignKey: "hospitalId" });

// Chuyên khoa - Bác sĩ (1-n)
db.Specialization.hasMany(db.Doctor, { foreignKey: "specializationId" });
db.Doctor.belongsTo(db.Specialization, { foreignKey: "specializationId" });

// Bác sĩ - Lịch làm việc (1-n)
db.Doctor.hasMany(db.DoctorSchedule, { foreignKey: "doctorId" });
db.DoctorSchedule.belongsTo(db.Doctor, { foreignKey: "doctorId" });


// Bác sĩ - Lịch hẹn (1-n)
db.Doctor.hasMany(db.Appointment, { foreignKey: "doctorId" });
db.Appointment.belongsTo(db.Doctor, { foreignKey: "doctorId" });

// Bệnh nhân - Lịch hẹn (1-n)
db.User.hasMany(db.Appointment, { foreignKey: "patientId" });
db.Appointment.belongsTo(db.User, { foreignKey: "patientId" });

// CSKH - Xác thực (1-n)
db.User.hasMany(db.Verification, { foreignKey: "verifiedById" });
db.Verification.belongsTo(db.User, { foreignKey: "verifiedById", as: "verifier" });

// Xác thực liên quan tới Bác sĩ hoặc Lịch hẹn
db.Verification.belongsTo(db.Doctor, { foreignKey: "doctorId" });
db.Verification.belongsTo(db.Appointment, { foreignKey: "appointmentId" });
// Một User có thể là một Doctor, và một Doctor phải liên kết với một User
db.User.hasOne(db.Doctor, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.Doctor.belongsTo(db.User, { foreignKey: 'userId' });
module.exports = db;
