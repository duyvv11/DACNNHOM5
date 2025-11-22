import React from 'react';
import { toast } from 'react-toastify';
import {useState} from "react";
import axios from 'axios';
import "./AppointmentList.css";
// chuyển đổi giờ utc
const formatDateTimeLocal = (utcDateString) => {
  if (!utcDateString) return "N/A";
  const date = new Date(utcDateString);
  return date.toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};
const handlestatusChange = async (task, id, fetchAppointments)=>{
  const reponse = await axios.put(`http://localhost:5000/api/appointments/${id}`,
    {
      status:task
    }
  );
  if (reponse){
    toast("Hủy lịch khám thành công");
    if (fetchAppointments) {
      fetchAppointments();
    }
  }
};


const AppointmentList = ({ appointments, role, fetchAppointments })=> {
  const [iscancel, setCancel] = useState(false);
  if (appointments.length === 0) {
    return <div className="empty-state">Không có lịch khám nào </div>;
  }

  return (
    <div className="appointment-list-container">
      <h3>Lịch Khám Đã Đặt</h3>

      {appointments.map((appt) => (
        <div key={appt.id} className={`appointment-item status-${appt.status.toLowerCase()}`}>
          <p>
            Thời gian: {formatDateTimeLocal(appt.startDateTime)}
          </p>
          <p>Bác sĩ: {appt.Doctor.User.name || ''}</p>
          <p>Địa chỉ khám: {appt.Doctor.Hospital.name} - - {appt.Doctor.Hospital.address}</p>
          <span className={`status-badge status-${appt.status.toLowerCase()}`}>
            Trạng thái: {appt.status}
          </span>
          <button className="view-btn">Xem Chi tiết</button>
          <>
          {appt.status === "CANCELLED" ?(<></>)
              : (<button className = "view-btn" onClick = { () => { handlestatusChange("CANCELLED",appt.id, fetchAppointments)}}>Hủy</button>)

          }
          </>

          
        </div>
      ))}
    </div>
  );
}

export default AppointmentList;