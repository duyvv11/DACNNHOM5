import { useState , useEffect } from "react";
import DoctorList from "../components/DoctorList"
import axios from "axios";

const DoctorListPage = ()=>{
  const [doctors,setDoctors] = useState("")
  useEffect(() => {
    const fetchdatadoctors=async ()=>{
      try {
        const reponse = await axios.get('http://localhost:5000/api/doctors')
        const resDoc = reponse.data;
        setDoctors(resDoc);
        
      } catch (error) {
        console.error("Lỗi tải dữ liệu trang chủ:", error);
      }
    }
    fetchdatadoctors();
  }, []);
  

  return(
    <DoctorList doctors={doctors}/>

  )
}
export default DoctorListPage;