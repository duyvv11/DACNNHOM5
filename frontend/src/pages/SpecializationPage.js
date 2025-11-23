import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SpecializationDetail from '../components/SpecializationDetail'; // Import component con
import DoctorList from "../components/DoctorList";

function SpecializationPage() {
  const { id } = useParams(); 
  const [specialization, setSpecialization] = useState("");
  const [doctors,setDoctor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    // gọi api lấy chuyên khoa by id lấy bác sĩ theo chuyên khoa
    Promise.all([
      axios.get(`http://localhost:5000/api/specializations/${id}`),
      axios.get(`http://localhost:5000/api/doctors/doctorbyspecialty/${id}`)
    ]).then(([ressp,resdc]) =>{
      const datasp = ressp.data
      setSpecialization(datasp.data);
      setDoctor(resdc.data);
      setLoading(false);
    }).catch(error =>{
      console.error("lỗi không lấy được ", error);
      setLoading(false);

    })
  }, [id]);

  if (loading) return <div className="loading-state container">Đang tải chi tiết chuyên khoa...</div>;
  if (error) return <div className="error-state container">{error}</div>;
  if (!specialization) return <div className="not-found-state container">Không tìm thấy chuyên khoa.</div>;

  return (
    <div className="specialization-page-container container">
      <SpecializationDetail
        specialization={specialization}
      />
      <DoctorList
        doctors={doctors}
      />
    </div>
  );
}

export default SpecializationPage;