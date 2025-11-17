module.exports = (sequelize, DataTypes) => {
    const Hospital = sequelize.define("Hospital", {
        name: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.STRING, allowNull: false },
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        description: DataTypes.TEXT,
        type: {
            type: DataTypes.ENUM("BENH_VIEN", "PHONG_KHAM_TU"),
            defaultValue: "BENH_VIEN"
        },
        image_hospital: DataTypes.STRING,
    });
    return Hospital;
};
