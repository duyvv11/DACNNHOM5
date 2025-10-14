import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Giả định bạn đã cài đặt react-router-dom và import Link
import { Link } from 'react-router-dom'; 
import './HomePage.css';

function HomePage() {
  const [specializations, setSpecializations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/specializations').then(res => setSpecializations(res.data));
    axios.get('http://localhost:5000/api/doctors').then(res => setDoctors(res.data));
    axios.get('http://localhost:5000/api/hospitals').then(res => setClinics(res.data));
  }, []);

  return (
    <div className="homepage">
    

      <section className="specializations">
        <h2>Danh mục chuyên khoa</h2>
        <div className="card-list">
          {specializations.map(sp => (
            // Thay div bằng Link và thêm thẻ img
            <Link key={sp.id} to={`/specialization/${sp.id}`} className="card specialization-card">
              
              
              <img 
                src={sp.image_url || '/default-specialization.png'} // Sử dụng image_url từ dữ liệu hoặc ảnh mặc định
                alt={sp.name} 
                className="card-image"
              />
              
              <div className="card-content">
                <h3>{sp.name}</h3>
                <p>{sp.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      
      
      <section className="doctors">
        <h2>Bác sĩ</h2>
        <div className="card-list">
          {doctors.map(doc => (
            <div key={doc.id} className="card">
              <Link to={`/doctor/${doc.id}`}>
                <img src={doc.profile_image || '/logo192.png'} alt={doc.name} />
                <h3>{doc.name}</h3>
              </Link>
              <p>Chuyên khoa: {doc.Specialization?.name}</p>
              <Link to={`/booking/${doc.id}`} className="button">Đặt lịch</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="clinics">
        <h2>Phòng khám / Bệnh viện</h2>
        <div className="card-list">
          {clinics.map(c => (
            <Link key={c.id} to={`/clinic/${c.id}`} className="card">
              <h3>{c.name}</h3>
              <p>{c.address}</p>
              <span className="button">Xem chi tiết</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;