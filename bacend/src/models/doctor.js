
module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define("Doctor", {
    name: { type: DataTypes.STRING, allowNull: false },
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    experience_years: DataTypes.INTEGER,
    title: DataTypes.STRING,
    workplace: DataTypes.STRING,
    work_hours: DataTypes.STRING,
    license_image: DataTypes.STRING,
    profile_image: DataTypes.STRING,
    password: DataTypes.STRING,
    status: {
        type: DataTypes.ENUM("PENDING", "VERIFIED", "REJECTED"),
        defaultValue: "PENDING"
    },
    hospitalId: { type: DataTypes.INTEGER },
    specializationId: { type: DataTypes.INTEGER }
    });
    return Doctor;
};
