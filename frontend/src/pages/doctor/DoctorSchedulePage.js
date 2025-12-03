
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ScheduleForm from "../../components/doctor/ScheduleForm";

const DoctorSchedulePage = () => {
  const userId = localStorage.getItem("id"); 
  const [currentSchedule, setCurrentSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSchedule = useCallback(async () => {
    if (!userId) {
      setIsLoading(false);
      toast.error("Không tìm thấy ID người dùng.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/doctor-schedules/schedulebydoctor/${userId}`
      );

      const fetchedSchedule = response.data;

      setCurrentSchedule(
        fetchedSchedule.map((s) => ({
          ...s,
          id: s.id || s._id, // chuẩn hoá lại id
        }))
      );
    } catch (error) {
      console.error("Lỗi khi tải lịch:", error);
      toast.info("Chưa có lịch nào được thiết lập.");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const handleUpdateSlot = async (slot) => {
    if (!slot.id) return;

    try {
      await axios.put(`http://localhost:5000/api/doctor-schedules/${slot.id}`, {
        ...slot,
      });

      toast.success("Cập nhật lịch thành công!");
      fetchSchedule();
    } catch (error) {
      toast.error("Cập nhật thất bại.");
      console.error("Lỗi cập nhật:", error);
    }
  };

  const handleCreateSlot = async (slot) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/doctor-schedules/`,
        {
          userId, // bắt buộc
          ...slot,
        }
      );

      toast.success("Thêm lịch thành công!");
      fetchSchedule();

      return response.data;
    } catch (error) {
      toast.error("Thêm lịch thất bại.");
      console.error("Lỗi tạo mới:", error);
    }
  };

  const handleDeleteSlot = async (scheduleId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/doctor-schedules/${scheduleId}`
      );

      toast.success("Xóa lịch thành công!");
      fetchSchedule();
    } catch (error) {
      toast.error("Xóa thất bại.");
      console.error("Lỗi xóa:", error);
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
        currentSchedule={currentSchedule}
        onUpdate={handleUpdateSlot}
        onCreate={handleCreateSlot}
        onDelete={handleDeleteSlot}
        onSave={() => {
          toast.info("Bạn hãy lưu từng dòng bằng nút riêng ");
        }}
      />
    </div>
  );
};

export default DoctorSchedulePage;
