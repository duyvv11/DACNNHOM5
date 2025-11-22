module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define("Doctor", {
        // Bỏ: name, age, gender, email, phone, address, password

        experience_years: DataTypes.INTEGER,
        title: DataTypes.STRING,
        workplace: DataTypes.STRING,
        work_hours: DataTypes.STRING,
        license_image: DataTypes.STRING,
        profile_image: DataTypes.STRING,
        status: {
            type: DataTypes.ENUM("PENDING", "VERIFIED", "REJECTED"),
            defaultValue: "PENDING"
        },
        userId: {
            type: DataTypes.INTEGER,
            unique: true, 
            allowNull: false 
        },
        hospitalId: { type: DataTypes.INTEGER },
        specializationId: { type: DataTypes.INTEGER }
    });
    return Doctor;
};