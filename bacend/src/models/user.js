module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: { type: DataTypes.STRING, allowNull: false },
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true }, // Key chung
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING,
    role: { 
      type: DataTypes.ENUM("USER", "DOCTOR", "ADMIN"),
      defaultValue: "USER"
    }
  });
  return User;
};
