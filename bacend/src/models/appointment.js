module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define("Appointment", {
    startDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },

    endDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("PENDING", "CONFIRMED", "CANCELLED", "DONE"),
      defaultValue: "PENDING"
    },
    diagnosis: DataTypes.TEXT,
    treatment_notes: DataTypes.TEXT,

    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    // 
    scheduleId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  return Appointment;
};
