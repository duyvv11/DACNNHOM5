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

// -------------------
// Thiết lập mối quan hệ
// -------------------

// 1. Bệnh viện - Bác sĩ (1-n)
db.Hospital.hasMany(db.Doctor, { foreignKey: "hospitalId" });
db.Doctor.belongsTo(db.Hospital, { foreignKey: "hospitalId" });

// 2. Chuyên khoa - Bác sĩ (1-n)
db.Specialization.hasMany(db.Doctor, { foreignKey: "specializationId" });
db.Doctor.belongsTo(db.Specialization, { foreignKey: "specializationId" });

// 3. Bác sĩ - Lịch hẹn (1-n)
db.Doctor.hasMany(db.Appointment, { foreignKey: "doctorId" });
db.Appointment.belongsTo(db.Doctor, { foreignKey: "doctorId" });

// 4. Bệnh nhân - Lịch hẹn (1-n)
db.User.hasMany(db.Appointment, { foreignKey: "userId" });
db.Appointment.belongsTo(db.User, { foreignKey: "userId" });

// 5. CSKH - Xác thực (1-n)
db.User.hasMany(db.Verification, { foreignKey: "verifiedById" });
db.Verification.belongsTo(db.User, { foreignKey: "verifiedById", as: "verifier" });

// 6. Xác thực liên quan tới Bác sĩ hoặc Lịch hẹn
db.Verification.belongsTo(db.Doctor, { foreignKey: "doctorId" });
db.Verification.belongsTo(db.Appointment, { foreignKey: "appointmentId" });

module.exports = db;
