module.exports = (sequelize, DataTypes) => {
  const Verification = sequelize.define("Verification", {
    type: {
      type: DataTypes.ENUM("DOCTOR_ACCOUNT", "APPOINTMENT"),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
      defaultValue: "PENDING"
    },
    notes: DataTypes.TEXT,
    verified_at: DataTypes.DATE
  });
  return Verification;
};
