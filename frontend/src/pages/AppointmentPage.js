import { useEffect, useState, useCallback } from "react";
import AppointmentList from "../components/AppointmentList";
import axios from 'axios';

const AppointmentPage = () => {
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`http://localhost:5000/api/appointments/user/${id}`);

      setAppointments(response.data.appointments);

    } catch (err) {
      setError("Không thể tải lịch khám. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchAppointments();
    } else {
      setLoading(false);
    }
  }, [id, fetchAppointments]);

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Đang tải danh sách lịch khám...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>Lỗi: {error}</div>;
  }

  if (appointments.length === 0) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Bạn chưa có lịch khám nào.</div>;
  }

  return (
    <div className="appointment-page-container">
      <AppointmentList
        appointments={appointments}
        userRole={role}
        fetchAppointments={fetchAppointments}
      />
    </div>
  );
}

export default AppointmentPage;