import { Link } from "react-router-dom";

function HospitalList({ clinics }) {
  return (
    <section className="clinics section-spacing">
      <h2>Phòng khám / Bệnh viện</h2>
      <div className="card-grid">
        {clinics.map(c => (
          <Link key={c.id} to={`/hospital/${c.id}`} className="card clinic-card hover-lift">
            <img
              src={c.image_hospital}
              alt={c.name}
              className="card-image clinic-image"
            />
            <div className="card-content">
              <h3 className="clinic-name">{c.name}</h3>
              <p className="clinic-address"> {c.address}</p>
              <span className="button secondary-button">Xem chi tiết</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default HospitalList;
