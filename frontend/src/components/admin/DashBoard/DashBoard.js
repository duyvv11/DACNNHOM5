import './DashBoard.css';
const DashBoard = ({data}) =>{
  const now = new Date();
  const currentDate = now.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh"
  });
  console.log(data);
  return (
    <>
    <h2>Thống Kê </h2>
      <p className="date-now">Cập nhật lúc: {currentDate}</p>
    <div className="DashBoard-Container">
      <div className="Doctor-Count-Cart itemdashboard">
          <p>Số Lượng Bác Sĩ: {data.doctorCount}</p>
      </div>
        <div className="Hospital-Count-Cart itemdashboard">
        <p>Số Lượng Bệnh Viện: {data.hospitalCount}</p>
      </div>
        <div className="Specialization-Count-Cart itemdashboard">
          <p>Số Lượng Chuyên Khoa: {data.specializationCount}</p>
      </div>
        <div className="User-Count-Cart itemdashboard">
          <p>Số Lượng Người Dùng: {data.userCount}</p>
      </div>
        <div className="Appointment-Count-Cart itemdashboard">
          <p>Tổng số lịch hẹn: {data.appointmentCount}</p>
          <p>Lịch hẹn thành công: {data.appointmentDoneCount}</p>
          <p>Lịch Hẹn bị hủy: {data.appointmentCancelledCount}</p>
          <p>Lịch Hẹn đang chờ: {data.appointmentPendingCount}</p>
      </div>

    </div>
    </>
  )
}
export default DashBoard;