import React from 'react';
import { toast } from 'react-toastify';
import {useState} from "react";
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
const handleCancel=async (task,id)=>{
  const kq = axios.put(`http://localhost:5000/api/appointments/${id}`);
  if(task ==="CANCLELLED" && kq){
    toast("Hủy lịch khám thành công");
  }
  else if (task ==="CONFIRMED" && kq){
    toast("Đã xác nhận lịch khám");
  }
  else if (task ==="DONE" && kq){
    toast("Khám xong");
  }
  else toast("lỗi");
};
const [iscancel,setCancel] = useState(false);
const [isConfirmed,setComfirm] = useState(false);
const [done,setDone] = useState(false);

const  AppointmentList=({ appointments, role })=> {
  if (appointments.length === 0) {
    return <div className="empty-state">Không có lịch khám nào được tìm thấy.</div>;
  }

  return (
    <div className="appointment-list-container">
      <h3>Lịch Khám Đã Đặt</h3>

      {appointments.map((appt) => (
        <div key={appt.id} className={`appointment-item status-${appt.status.toLowerCase()}`}>
          <p>
            Thời gian: {formatDateTimeLocal(appt.startDateTime)}
          </p>
          <p>
            {role === 'DOCTOR'
              ? `Bệnh nhân: ${appt.User?.name || ''}`
              : `Bác sĩ: ${appt.Doctor?.User?.name || ''}`
            }
          </p>
          <span className={`status-badge status-${appt.status.toLowerCase()}`}>
            Trạng thái: {appt.status}
          </span>
          <button className="view-btn">Xem Chi tiết</button>
          <button className="view-btn" type="submit" onSubmit={handleCancel}>Hủy</button>
          <>
            {role === 'DOCTOR' &&(
                <button>Nhận Lịch Hẹn</button>

            )}
          </>
          
        </div>
      ))}
    </div>
  );
}

export default AppointmentList;