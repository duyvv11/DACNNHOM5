import { useState , useEffect  } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import HospitalDetail from "../components/HospitalDetail";
import "./HostpitalDetailPage.css";
import DoctorList from "../components/DoctorList";
const HospitalDetailPage = ()=>{
  const {id} = useParams()
  const [hospital,setHospital] = useState([]);
  const [doctors,setDoctor] = useState([]);
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:5000/api/hospitals/${id}`),
      axios.get(`http://localhost:5000/api/doctors/doctorbyhospital/${id}`)
    ])
      .then(([resHp, resDoc]) => {
        setHospital(resHp.data);
        setDoctor(resDoc.data);
      })
      .catch(err => console.error("lỗi tải dữ liệu", err));
  }, [id]);

  return (
    <>
    <HospitalDetail hospital={hospital}/>
    <DoctorList doctors={doctors}/>
    </>
  )
}
export default HospitalDetailPage;