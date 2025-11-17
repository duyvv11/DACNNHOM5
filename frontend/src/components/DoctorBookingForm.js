import { useState, useEffect } from "react";
import axios from "axios";
import "./DoctorBookingForm.css";
import { toast } from "react-toastify";

function DoctorBookingForm({ doctor }) {
  const [availableDays, setAvailableDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const patientId = localStorage.getItem('id');
  console.log("doctor",doctor);

  // load lịch 30 ngày từ API
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/doctor-schedules/${doctor.id}/available-days`)
      .then(res => setAvailableDays(res.data.availableDays))
      .catch(err => console.log(err));
  }, [doctor.id]);

  const handleBooking = async () => {
    if (!selectedDate || !selectedSlot) {
      toast("Vui lòng chọn ngày và giờ");
      return;
    }

    await axios.post("http://localhost:5000/api/appointments", {
      doctorId: doctor.id,
      date: selectedDate.date,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      scheduleId: selectedSlot.scheduleId,
      patientId
    });

    toast("Đặt lịch thành công!");
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  return (
    <div className="booking-container">

      {/* LEFT: Doctor Info */}
      <div className="doctor-left">
        <img src={doctor.profile_image} alt="" className="doctor-img" />
        <h2>{doctor.title} {doctor.User?.name}</h2>
        <p>Chuyên khoa: {doctor.Specialization?.name}</p>
        <p>Điện thoại: {doctor.User?.phone}</p>
        <p>Email: {doctor.User?.email}</p>
        <p>Nơi làm việc: {doctor.Hospital?.name}</p>
      </div>

      {/* RIGHT: Booking Form */}
      <div className="booking-right">
        <h3>Chọn ngày khám</h3>

        <div className="day-list">
          {availableDays.map(day => (
            <button
              key={day.date}
              className={`day-btn ${selectedDate?.date === day.date ? "active" : ""}`}
              onClick={() => {
                setSelectedDate(day);
                setSelectedSlot(null);
              }}
            >
              {day.date} <br /> {day.dayOfWeek}
            </button>
          ))}
        </div>

        {selectedDate && (
          <>
            <h3>Chọn giờ</h3>
            <div className="time-list">
              {selectedDate.slots.map((slot, index) => (
                <button
                  key={index}
                  className={`time-btn ${selectedSlot === slot ? "active" : ""}`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot.startTime} - {slot.endTime}
                </button>
              ))}
            </div>
          </>
        )}

        <button
          className="confirm-btn"
          disabled={!selectedSlot}
          onClick={handleBooking}
        >
          Xác nhận đặt lịch
        </button>
      </div>
    </div>
  );
}

export default DoctorBookingForm;
