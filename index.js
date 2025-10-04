const express = require('express');
const { sequelize } = require('./bacend/src/models/index.js');
const cors = require('cors');
// require('dotenv').config();

const app = express();


app.use(express.json());
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced successfully');
});

app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        methods:['GET','POST','PUT','DELETE']
    }
))

app.get('/', (req, res) => {
  res.send('Hello World!');
});
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});