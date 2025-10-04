module.exports = (sequelize, DataTypes) => {
  const Specialization = sequelize.define("Specialization", {
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT
  });
  return Specialization;
};
