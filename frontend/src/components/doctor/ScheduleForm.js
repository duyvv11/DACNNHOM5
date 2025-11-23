// ScheduleForm.js

import React, { useState, useEffect } from 'react';
import './ScheduleForm.css';
import { toast } from "react-toastify";

const ALL_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const ScheduleForm = ({ currentSchedule = [], onUpdate, onCreate, onDelete }) => {
  const [scheduleData, setScheduleData] = useState(currentSchedule);
  // Form thêm mới
  const [newSlot, setNewSlot] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    isAvailable: true,
  });

  useEffect(() => {
    setScheduleData(currentSchedule);
  }, [currentSchedule]);

  /* -------------------- UPDATE EXISTING SLOT -------------------- */
  const handleChange = (index, field, value) => {
    const updated = [...scheduleData];
    // bảo vệ null/undefined
    if (!updated[index]) return;
    updated[index] = { ...updated[index], [field]: value };
    setScheduleData(updated);
  };

  const handleSaveSlot = async (index) => {
    const slot = scheduleData[index];

    if (!slot.dayOfWeek || !slot.startTime || !slot.endTime) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      await onUpdate(slot);
      toast.success("Cập nhật lịch thành công!");
    } catch (err) {
      console.error("Lỗi cập nhật slot:", err);
      toast.error("Cập nhật thất bại.");
    }
  };

  const handleDelete = (index) => {
    const slot = scheduleData[index];

    if (window.confirm("Bạn muốn xóa lịch này?")) {
      const updated = [...scheduleData];
      updated.splice(index, 1);
      setScheduleData(updated);

      if (slot && slot.id) onDelete(slot.id);
    }
  };

  /* -------------------- CREATE NEW SLOT -------------------- */
  const handleCreateSlot = async () => {
    if (!newSlot.dayOfWeek || !newSlot.startTime || !newSlot.endTime) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      const created = await onCreate(newSlot);
      if (created && (created._id || created.id)) {
        setScheduleData(prev => [
          ...prev,
          {
            ...created,
            id: created._id || created.id,
          }
        ]);
      }

      // reset form mới
      setNewSlot({
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        isAvailable: true,
      });

      toast.success("Thêm lịch thành công!");
    } catch (err) {
      console.error("Lỗi tạo mới slot:", err);
      toast.error("Thêm thất bại.");
    }
  };

  /* -------------------- SORT FOR DISPLAY (kèm originalIndex) -------------------- */
  const sortedSchedule = scheduleData
    .map((item, idx) => ({ ...item, originalIndex: idx }))
    .sort(
      (a, b) => ALL_DAYS.indexOf(a.dayOfWeek) - ALL_DAYS.indexOf(b.dayOfWeek)
    );

  return (
    <div className="schedule-form">

      {/* -------------------- FORM THÊM MỚI -------------------- */}
      <h3>Thêm Lịch Khám Mới</h3>

      <div className="create-slot-box">
        <select
          value={newSlot.dayOfWeek}
          onChange={(e) => setNewSlot({ ...newSlot, dayOfWeek: e.target.value })}
        >
          <option value="">Chọn Ngày</option>
          {ALL_DAYS.map(day => <option key={day} value={day}>{day}</option>)}
        </select>

        <input
          type="time"
          value={newSlot.startTime}
          onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
        />

        <input
          type="time"
          value={newSlot.endTime}
          onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
        />

        <label>
          <input
            type="checkbox"
            checked={!!newSlot.isAvailable}
            onChange={(e) => setNewSlot({ ...newSlot, isAvailable: e.target.checked })}
          />
          Khả dụng
        </label>

        <button className="btn-create" onClick={handleCreateSlot}>
          Lưu Mới
        </button>
      </div>

      <hr />

      {/* -------------------- BẢNG CHỈNH SỬA -------------------- */}
      <h3>Danh Sách Lịch Làm Việc</h3>

      {sortedSchedule.length === 0 && (
        <div className="empty-schedule">Chưa có lịch nào.</div>
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
          {sortedSchedule.map((slot) => {
            const idx = slot.originalIndex;
            const key = slot.id || `new-${idx}`;
            return (
              <tr key={key}>
                <td>
                  <select
                    value={slot.dayOfWeek || ""}
                    onChange={(e) => handleChange(idx, "dayOfWeek", e.target.value)}
                  >
                    <option value="" disabled>Chọn Ngày</option>
                    {ALL_DAYS.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </td>

                <td>
                  <input
                    type="time"
                    value={slot.startTime || ""}
                    onChange={(e) => handleChange(idx, "startTime", e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="time"
                    value={slot.endTime || ""}
                    onChange={(e) => handleChange(idx, "endTime", e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="checkbox"
                    checked={!!slot.isAvailable}
                    onChange={(e) => handleChange(idx, "isAvailable", e.target.checked)}
                  />
                </td>

                <td>
                  <button className="btn-update" onClick={() => handleSaveSlot(idx)}>
                    Cập nhật
                  </button>

                  <button className="delete-schedule-btn" onClick={() => handleDelete(idx)}>
                    Xóa
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

    </div>
  );
};

export default ScheduleForm;
