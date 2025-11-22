import React, { useState, useEffect } from 'react';
import './ScheduleForm.css';

const ALL_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const ScheduleForm = ({ currentSchedule = [], onSave }) => {
  const [scheduleData, setScheduleData] = useState(currentSchedule);

  useEffect(() => {
    setScheduleData(currentSchedule);
  }, [currentSchedule]);

  const handleChange = (index, field, value) => {
    const updatedSchedule = [...scheduleData];
    updatedSchedule[index][field] = value;
    setScheduleData(updatedSchedule);
  };


  const handleAddSlot = () => {
    setScheduleData([...scheduleData, {
      dayOfWeek: '', 
      startTime: '', 
      endTime: '',   
      isAvailable: true, 
      id: null,
    }]);
  };

  const handleDelete = (index) => {
    if (window.confirm("Bạn muốn xóa lịch làm việc này")) {
      const updatedSchedule = [...scheduleData];
      updatedSchedule.splice(index, 1);
      setScheduleData(updatedSchedule);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lọc các slot không hợp lệ trước khi gửi
    const validSchedules = scheduleData.filter(slot =>
      slot.dayOfWeek && slot.startTime && slot.endTime
    );

    onSave(validSchedules);
  };

  const sortedSchedule = [...scheduleData].sort((a, b) =>
    ALL_DAYS.indexOf(a.dayOfWeek) - ALL_DAYS.indexOf(b.dayOfWeek)
  );

  return (
    <form onSubmit={handleSubmit} className="schedule-form">
      <button type="button" onClick={handleAddSlot} className="add-schedule-btn">
        Thêm Lịch Khám
      </button>

      {sortedSchedule.length === 0 && (
        <div className="empty-schedule">Bác sĩ chưa có lịch trình nào được lưu.</div>
      )}

      <table>
        <thead>
          <tr>
            <th>Ngày</th>
            <th>Bắt đầu</th>
            <th>Kết thúc</th>
            <th>Khả dụng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {sortedSchedule.map((slot, index) => (
            <tr key={index}>
              <td>
                <select
                  value={slot.dayOfWeek}
                  onChange={(e) => handleChange(index, 'dayOfWeek', e.target.value)}
                // Thêm option trống cho slot mới
                >
                  {slot.dayOfWeek === '' && <option value="" disabled>Chọn Ngày</option>}
                  {ALL_DAYS.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="time"
                  value={slot.startTime}
                  onChange={(e) => handleChange(index, 'startTime', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) => handleChange(index, 'endTime', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={slot.isAvailable}
                  onChange={(e) => handleChange(index, 'isAvailable', e.target.checked)}
                />
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="delete-schedule-btn"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit" className="save-schedule-btn">Lưu Lịch Trình</button>
    </form>
  );
};

export default ScheduleForm;