import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "../AppointmentList.css";
// form mat ngày giờ
const formatDateTimeLocal = (utcDateString) => {
  if (!utcDateString) return "N/A";
  const date = new Date(utcDateString);
  return date.toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// cập nhật trạng thái
const updateAppointmentStatus = async (
  status,
  id,
  fetchAppointments,
  diagnosis = null,
  treatment_notes = null
) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/appointments/${id}`,
      { status, diagnosis, treatment_notes }
    );

    if (response) {
      let message = "";
      switch (status) {
        case "CONFIRMED":
          message = "Xác nhận lịch khám thành công!";
          break;
        case "DONE":
          message = "Cập nhật khám xong thành công!";
          break;
        case "CANCELLED":
          message = "Hủy lịch khám thành công!";
          break;
        default:
          message = "Cập nhật thành công!";
      }

      toast.success(message);
      if (fetchAppointments) fetchAppointments();
    }
  } catch (err) {
    toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
    console.error(err);
  }
};

const DoctorAppointmentList = ({ appointments, fetchAppointments }) => {
  
  const [showModal, setShowModal] = useState(false); 
  const [currentApptId, setCurrentApptId] = useState(null);
  const [diagnosis, setDiagnosis] = useState(""); 
  const [treatmentNotes, setTreatmentNotes] = useState("");

  
  const [showDetailModal, setShowDetailModal] = useState(false); // trang thai de hien thi form xem chi tiet
  const [selectedAppointment, setSelectedAppointment] = useState(null); // chi tiet

  //bấm nút khám xong
  const handleDoneClick = (id) => {
    setCurrentApptId(id);
    setShowModal(true);
  };

  //bấm xem chi tiết 
  const handleViewDetail = (appt) => {
    setSelectedAppointment(appt);
    setShowDetailModal(true);
  };

  // gửi dữ liệu 
  const submitDone = () => {
    if (!diagnosis.trim() || !treatmentNotes.trim()) {
      toast.error("Vui lòng nhập đầy đủ chẩn đoán và hướng dẫn điều trị!");
      return;
    }

    updateAppointmentStatus(
      "DONE",
      currentApptId,
      fetchAppointments,
      diagnosis,
      treatmentNotes
    );

    setShowModal(false);
    setDiagnosis("");
    setTreatmentNotes("");
  };

  if (!appointments || appointments.length === 0) {
    return <div className="empty-state">Không có lịch khám nào</div>;
  }

  return (
    <div className="appointment-list-container">
      <h3>Lịch Khám Của Bác Sĩ</h3>

      {appointments.map((appt) => (
        <div
          key={appt.id}
          className={`appointment-item status-${appt.status.toLowerCase()}`}
        >
          <p>Thời gian: {formatDateTimeLocal(appt.startDateTime)}</p>
          <p>Bệnh nhân: {appt.User.name || "N/A"}</p>
          <p>
            Địa chỉ khám: {appt.Doctor.Hospital.name} -{" "}
            {appt.Doctor.Hospital.address}
          </p>

          <span className={`status-badge status-${appt.status.toLowerCase()}`}>
            Trạng thái: {appt.status}
          </span>

          <div className="appointment-actions">
            <button className="view-btn" onClick={() => handleViewDetail(appt)}>
              Xem Chi tiết
            </button>

            {appt.status === "PENDING" && (
              <>
                <button
                  className="confirm-btn "
                  onClick={() =>
                    updateAppointmentStatus(
                      "CONFIRMED",
                      appt.id,
                      fetchAppointments
                    )
                  }
                >
                  Nhận lịch
                </button>
                <button
                  className="cancel-btn view-btn"
                  onClick={() =>
                    updateAppointmentStatus(
                      "CANCELLED",
                      appt.id,
                      fetchAppointments
                    )
                  }
                >
                  Từ chối
                </button>
              </>
            )}

            {appt.status === "CONFIRMED" && (
              <>
                <button
                  className="done-btn"
                  onClick={() => handleDoneClick(appt.id)}
                >
                  Khám xong
                </button>

                <button
                  className="cancel-btn"
                  onClick={() =>
                    updateAppointmentStatus(
                      "CANCELLED",
                      appt.id,
                      fetchAppointments
                    )
                  }
                >
                  Hủy
                </button>
              </>
            )}

            {appt.status === "DONE" && (
              <span className="done-label">Đã khám xong</span>
            )}
            {appt.status === "CANCELLED" && (
              <span className="cancelled-label">Đã hủy</span>
            )}
          </div>
        </div>
      ))}
        {/* hiện ô nhập dữ liệu chuẩn đoán bệnh */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Nhập thông tin khám</h3>

            <label>Chẩn đoán bệnh</label>
            <input
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Bệnh chuẩn đoán"
            />

            <label>Hướng dẫn điều trị</label>
            <textarea
              value={treatmentNotes}
              onChange={(e) => setTreatmentNotes(e.target.value)}
              placeholder="Hướng dẫn dùng thuốc, thời gian tái khám..."
            />

            <div className="modal-actions">
              <button className="confirm-btn" onClick={submitDone}>
                Lưu lại
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

        {/* chi tiết của lịch khám */}
      {showDetailModal && selectedAppointment && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Chi Tiết Lịch Khám</h3>

            <p>
              <strong>Bệnh nhân:</strong> {selectedAppointment.User.name}
            </p>
            <p>
              <strong>Thời gian:</strong>{" "}
              {formatDateTimeLocal(selectedAppointment.startDateTime)}
            </p>
            <p>
              <strong>Bệnh viện:</strong>{" "}
              {selectedAppointment.Doctor.Hospital.name} -{" "}
              {selectedAppointment.Doctor.Hospital.address}
            </p>

            <p>
              <strong>Trạng thái:</strong> {selectedAppointment.status}
            </p>
            <p>
              <strong>Chuẩn đoán :</strong>{selectedAppointment.diagnosis}
            </p>
            <p>
              <strong>Điều trị :</strong>{selectedAppointment.treatment_notes}
            </p>

            {selectedAppointment.status === "DONE" && (
              <>
                <p>
                  <strong>Chẩn đoán:</strong>{" "}
                  {selectedAppointment.diagnosis || "Không có"}
                </p>
                <p>
                  <strong>Hướng dẫn điều trị:</strong>{" "}
                  {selectedAppointment.treatment_notes || "Không có"}
                </p>
              </>
            )}

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowDetailModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointmentList;
