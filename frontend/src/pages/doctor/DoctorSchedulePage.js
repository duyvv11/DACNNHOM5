

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ScheduleForm from '../../components/doctor/ScheduleForm';

const DoctorSchedulePage = () => {
  const doctorId = localStorage.getItem("id");
  const [currentSchedule, setCurrentSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  //lấy lịch làm việc hiện tại
  const fetchSchedule = useCallback(async () => {
    if (!doctorId) {
      setIsLoading(false);
      toast.error("Không tìm thấy ID bác sĩ.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/doctor-schedules/schedulebydoctor/${doctorId}`);
      const fetchedSchedule = response.data;
      setCurrentSchedule(fetchedSchedule);
    } catch (error) {
      console.error("Lỗi khi tải lịch trình:", error);
      toast.info("Chưa có lịch trình nào được thiết lập.");
    } finally {
      setIsLoading(false);
    }
  }, [doctorId]);

  // lưu lịch làm việc
  const handleSaveSchedule = async (scheduleData) => {
    try {
      await axios.post(`http://localhost:5000/api/doctors/schedule/${doctorId}`, {
        schedules: scheduleData
      });
      toast.success("Cập nhật lịch làm việc thành công!");
      fetchSchedule(); // Tải lại lịch trình sau khi lưu
    } catch (error) {
      toast.error("Không thể lưu lịch trình. Vui lòng thử lại.");
      console.error("Lỗi lưu lịch trình:", error);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  if (isLoading) {
    return <div className="loading-state">Đang tải lịch trình...</div>;
  }

  return (
    <div className="schedule-page-container">
      <h3>Thiết Lập Lịch Làm Việc</h3>
      <ScheduleForm
        doctorId={doctorId}
        currentSchedule={currentSchedule}
        onSave={handleSaveSchedule}
      />
    </div>
  );
};

export default DoctorSchedulePage;