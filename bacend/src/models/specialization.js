module.exports = (sequelize, DataTypes) => {
  const Specialization = sequelize.define("Specialization", {
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    image_url: { 
      type: DataTypes.STRING,
      allowNull: true // Ảnh có thể không bắt buộc
    }
  });
  return Specialization;
};
