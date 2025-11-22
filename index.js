const express = require('express');
const { sequelize } = require('./bacend/src/models/index.js');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./bacend/src/routers/userRoutes');
const doctorRoutes = require('./bacend/src/routers/doctorRoutes');
const appointmentRoutes = require('./bacend/src/routers/appointmentRoutes');
const hospitalRoutes = require('./bacend/src/routers/hospitalRoutes');
const specializationRoutes = require('./bacend/src/routers/specializationRoutes');
const verificationRoutes = require('./bacend/src/routers/verificationRoutes');
const newsRoutes = require('./bacend/src/routers/newsRoutes');
const doctorScheduleRoutes = require('./bacend/src/routers/doctorSchedule');
const aiRoutes = require('./bacend/src/routers/aiRoutes')
// const authRoutes = require('./bacend/src/routers/auth')


const app = express();
app.use(express.json());
sequelize.sync({alter:true}).then(() => {
  console.log('Database synced successfully');
});

app.use(cors(
    {
        origin: 'http://localhost:3000',
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders: ['Content-Type']
    }
))


app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/specializations', specializationRoutes);
app.use('/api/verifications', verificationRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/doctor-schedules', doctorScheduleRoutes);
app.use('/api/ai',aiRoutes);
// app.use('/api',authRoutes);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});