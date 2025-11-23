import { useState } from "react";
import { Link } from "react-router-dom";
import './DoctorList.css';
function DoctorList({ doctors }) {
  const [search, setSearch] = useState("");

  // Lọc bác sĩ theo tên hoặc chuyên khoa
  const filteredDoctors = doctors.filter((doc) => {
    const name = doc.User?.name?.toLowerCase() ;
    const query = search.toLowerCase();
    return name.includes(query) ;
  });

  if (doctors.length === 0) {
    return <div>Không có bác sĩ</div>;
  }

  return (
    <section className="doctors section-spacing">
      <h2>Bác Sĩ</h2>

      <input
        type="text"
        placeholder="Tìm kiếm bác sĩ"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="doctor-search"
      />

      <div className="card-grid doctor-grid">
        {filteredDoctors.length === 0 ? (
          <p>Không tìm thấy bác sĩ nào.</p>
        ) : (
          filteredDoctors.map((doc) => {
            const { id, profile_image, User, Specialization, Hospital, userid } = doc;

            return (
              <div key={id} className="card doctor-card hover-lift">
                <Link to={`/doctor/${id}`} className="doctor-link">
                  <img
                    src={profile_image}
                    alt={User?.name}
                    className="doctor-image"
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
          })
        )}
      </div>
    </section>
  );
}

export default DoctorList;
