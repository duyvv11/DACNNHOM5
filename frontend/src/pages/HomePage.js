import React, { useEffect, useState } from 'react';
import axios from 'axios';

import SpecializationList from '../components/SpecializationList';
import DoctorList from '../components/DoctorList';
import ClinicList from '../components/HostpitalList';

import './HomePage.css';

function HomePage() {
  const [specializations, setSpecializations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:5000/api/specializations'),
      axios.get('http://localhost:5000/api/doctors'),
      axios.get('http://localhost:5000/api/hospitals'),
    ])
      .then(([resSp, resDoc, resClinic]) => {
        setSpecializations(resSp.data);
        setDoctors(resDoc.data);
        setClinics(resClinic.data);
      })
      .catch(err => console.error("Lỗi tải dữ liệu trang chủ:", err));
  }, []);

  return (
    <div className="homepage container">
      <SpecializationList specializations={specializations} />
      <DoctorList doctors={doctors} />
      <ClinicList clinics={clinics} />
    </div>
  );
}

export default HomePage;
