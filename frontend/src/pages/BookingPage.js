import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import DoctorBookingForm from "../components/DoctorBookingForm";
import "./BookingPage.css";

function BookingPage() {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/doctors/${doctorId}`)
      .then(res => setDoctor(res.data))
      .catch(err => console.error("Lỗi load thông tin bác sĩ:", err));
  }, [doctorId]);

  if (!doctor) return <div>Đang tải thông tin bác sĩ...</div>;

  return (
    <div className="booking-page container">
      <DoctorBookingForm doctor={doctor} />
    </div>
  );
}

export default BookingPage;
