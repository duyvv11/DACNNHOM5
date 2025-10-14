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
  .then(() => console.log('conected'))
  .catch((err) => console.error('error conect data', err));

module.exports = sequelize;
