const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('databenhvien','root',null,
 
  {
    host: "localhost",
    dialect: "mysql", 
    logging: false, 
    
  }
);

sequelize
  .authenticate()
  .then(() => console.log('✅ Kết nối MySQL thành công'))
  .catch((err) => console.error('❌ Lỗi kết nối MySQL:', err));

module.exports = sequelize;
