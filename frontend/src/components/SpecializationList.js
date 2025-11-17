import { Link } from "react-router-dom";

function SpecializationList({ specializations }) {
  return (
    <section className="specializations section-spacing">
      <h2>Danh mục chuyên khoa</h2>
      <div className="card-grid">
        {specializations.map(sp => (
          <Link
            key={sp.id}
            to={`/specialization/${sp.id}`}
            className="card specialization-card hover-lift"
          >
            <img
              src={sp.image_url}
              alt={sp.name}
              className="card-image specialization-image"
            />
            <div className="card-content">
              <h3>{sp.name}</h3>
              <p>{sp.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default SpecializationList;
