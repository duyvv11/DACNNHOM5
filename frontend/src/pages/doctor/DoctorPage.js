import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorAppointmentList from '../../components/doctor/DoctorAppointmentList';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import "./Doctorinfo.css";

// Tách Modal ra thành một component nhỏ hoặc định nghĩa ngay tại đây
const DoctorInfoModal = ({ infoDoctor, onClose }) => {
  if (!infoDoctor || !infoDoctor.User) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>

        <h3>Thông Tin Của Tôi</h3>
        <div className="doctor-info-card">

          {/* Ảnh đại diện */}
          <div className="info-item profile-image-container">
            <img src={infoDoctor.profile_image} alt="Profile" />
          </div>

          <div className="info-item">
            <span className="label">Tên Bác Sĩ:</span>
            <span className="value">{infoDoctor.User.name}</span>
          </div>
          <div className="info-item">
            <span className="label">Chức Danh:</span>
            <span className="value">{infoDoctor.title || 'Đang cập nhật'}</span>
          </div>
          <div className="info-item">
            <span className="label">Số Năm Kinh Nghiệm:</span>
            <span className="value">{infoDoctor.experience_years} năm</span>
          </div>
          <div className="info-item">
            <span className="label">Nơi Làm Việc:</span>
            <span className="value">{infoDoctor.workplace || 'Đang cập nhật'}</span>
          </div>
          <div className="info-item">
            <span className="label">Giờ Làm Việc:</span>
            <span className="value">{infoDoctor.work_hours || 'Chưa xác định'}</span>
          </div>
          <div className="info-item">
            <span className="label">Chuyên Khoa:</span>
            <span className="value">{infoDoctor.Specialization?.name || 'Chưa xác định'}</span>
          </div>
          <div className="info-item">
            <span className="label">Cần cập nhật thông tin phần bác sĩ liên hệ admin</span>
            
          </div>
        </div>
      </div>
    </div>
  );
};


const DoctorPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [infoDoctor, setinfoDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingInfo, setIsLoadingInfo] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const id = localStorage.getItem("id");

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:5000/api/appointments/doctor/${id}`);
      setAppointments(response.data.appointments);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Không thể tải danh sách lịch khám.");
      setIsLoading(false);
    }
  };

  const fetchDataDetailDoctor = async () => {
    try {
      const reponse = await axios.get(`http://localhost:5000/api/doctors/${id}`);
      setinfoDoctor(reponse.data);
      setIsLoadingInfo(false)
    } catch (error) {
      console.error(error);
      toast.error("Không thể tải thông tin info");
      setIsLoadingInfo(false);
    }
  };

  useEffect(() => {
  fetchAppointments();
  fetchDataDetailDoctor();

  }, []);

  if (isLoading) {
    return <div>Đang tải danh sách lịch khám...</div>;
  }

  return (
    <div className="doctor-appointments-page">
      <div className="top-controls">
        <button className="view-btn">
          <Link to="/doctorschedulepage" style={{ textDecoration: 'none', color: 'white' }}>Trang lập lịch khám</Link>
        </button>

        {infoDoctor && !isLoadingInfo && (
          <button
            className="info-btn"
            onClick={() => setIsModalOpen(true)}
            style={{ marginLeft: '10px' }} 
          >
            Thông Tin Của Tôi
          </button>
        )}

      </div>

      <hr />

      <h3>Danh sách Cuộc hẹn</h3>
      <DoctorAppointmentList appointments={appointments} fetchAppointments={fetchAppointments} />
      {isModalOpen && infoDoctor && (
        <DoctorInfoModal
          infoDoctor={infoDoctor}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default DoctorPage;