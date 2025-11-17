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
        // Khóa ngoại tự động được thiết lập thông qua associations
        userId: {
            type: DataTypes.INTEGER,
            unique: true, // Thêm unique để đảm bảo mối quan hệ 1-1
            allowNull: false // Bắt buộc phải liên kết với 1 User
        },
        hospitalId: { type: DataTypes.INTEGER },
        specializationId: { type: DataTypes.INTEGER }
    });
    return Doctor;
};