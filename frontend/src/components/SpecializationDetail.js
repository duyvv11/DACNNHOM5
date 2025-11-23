

function SpecializationDetail({ specialization }) {

  if (!specialization) return null;

  return (
    <div className="specialization-detail-content section-spacing">

      {/* THÔNG TIN CHI TIẾT CHUYÊN KHOA */}
      <section className="specialization-header">
        <img
          src={specialization.image_url || ''}
          alt={specialization.name}
          className="header-image"
        />
        <h1>{specialization.name}</h1>
        <p className="description">{specialization.description}</p>
      </section>

      <hr />

    </div>
  );
}

export default SpecializationDetail;