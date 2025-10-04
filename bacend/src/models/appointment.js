module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define("Appointment", {
    date: { type: DataTypes.DATE, allowNull: false },
    status: {
      type: DataTypes.ENUM("PENDING", "CONFIRMED", "CANCELLED", "DONE"),
      defaultValue: "PENDING"
    },
    diagnosis: DataTypes.TEXT,
    treatment_notes: DataTypes.TEXT
  });
  return Appointment;
};
