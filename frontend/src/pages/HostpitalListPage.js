import { useState, useEffect } from "react";
import HospitalList from "../components/HostpitalList";
import axios from "axios";

const HospitalListPage = () => {
  const [hospitals, setHospital] = useState([])
  const fetchdatahospitals = async () => {
    try {
      const reponse = await axios.get('http://localhost:5000/api/hospitals')
      const resHp = reponse.data;
      setHospital(resHp);
    } catch (error) {
      console.error("Lỗi tải dữ liệu", error);
    }
  }
  useEffect(() => {
    fetchdatahospitals();
  }, []);


  return (
    <HospitalList clinics={hospitals}/>

  )
}
export default HospitalListPage;