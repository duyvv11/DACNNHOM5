import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorAppointmentList from '../../components/doctor/DoctorAppointmentList';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const DoctorPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const id = localStorage.getItem("id");

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:5000/api/appointments/doctor/${id}`); 
      toast(response);
      setAppointments(response.data.appointments);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Không thể tải danh sách lịch khám.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (isLoading) {
    return <div>Đang tải danh sách lịch khám...</div>;
  }

  return (
    <div className="doctor-appointments-page">
      <button className="view-btn"><Link to="/doctorschedulepage" style={{textDecoration:'none',color:'white'}}>Trang lập lịch khám</Link></button>
      <DoctorAppointmentList appointments={appointments} fetchAppointments={fetchAppointments} />
    </div>
  );
};

export default DoctorPage;
