import { Link } from "react-router-dom";

function DoctorList({ doctors }) {
  if(doctors.length === 0){
    return <div>Không có bác sĩ</div>
  }
  return (
    <section className="doctors section-spacing">
      <h2>Bác Sĩ</h2>
      <div className="card-grid doctor-grid">
        {doctors.map(doc => {
          const { id, profile_image, User, Specialization, Hospital ,userid} = doc;

          return (
            <div key={id} className="card doctor-card hover-lift">
              <Link to={`/doctor/${id}`} className="doctor-link">
                <img
                  src={profile_image}
                  alt={User?.name}
                  className="card-image doctor-image"
                />
                <div className="card-content text-center">
                  <h3 className="doctor-name">{User?.name}</h3>
                  <p>
                    Chuyên khoa: <strong>{Specialization?.name || "Đang cập nhật"}</strong>
                  </p>
                  <p>
                    Bệnh viện: <strong>{Hospital?.name || "Đang cập nhật"}</strong>
                  </p>
                </div>
              </Link>

              <Link to={`/booking/${userid}`} className="button primary-button">
                Đặt lịch
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default DoctorList;
