import { useState } from "react";
import { Link } from "react-router-dom";

function HospitalList({ clinics }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClinics = clinics.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="clinics section-spacing">
      <h2>Phòng khám / Bệnh viện</h2>

      {/* Ô tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm bệnh viện..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <div className="card-grid">
        {filteredClinics.map(c => (
          <Link key={c.id} to={`/hospital/${c.id}`} className="card clinic-card hover-lift">
            <img
              src={c.image_hospital}
              alt={c.name}
              className="card-image clinic-image"
            />
            <div className="card-content">
              <h3 className="clinic-name">{c.name}</h3>
              <p className="clinic-address">{c.address}</p>
              <span className="button secondary-button">Xem chi tiết</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Nếu không có kết quả */}
      {filteredClinics.length === 0 && (
        <p style={{ marginTop: "20px", color: "#888" }}>Không tìm thấy bệnh viện!</p>
      )}
    </section>
  );
}

export default HospitalList;
