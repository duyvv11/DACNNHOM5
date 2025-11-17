

const HospitalDetail =({hospital})=>{
  return(
    <div className="HospitalDetail-Content">
      <section>
        <img className="img-hospital" src={hospital.image_hostpital} alt="anh hostpital"></img>
        <h3 className="HospitalName">{hospital.name}</h3>
        <p className="description">{hospital.description}</p>
        <p>Địa chỉ:{hospital.address}</p>
        <p>Phone:{hospital.phone}</p>
        <p>Email:{hospital.email}</p>
      </section>  
    </div>

  )
}
export default HospitalDetail;