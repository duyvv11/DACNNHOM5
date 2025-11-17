import { useState, useEffect } from "react";
import SpecializationList from "../components/SpecializationList"
import axios from "axios";

const SpecializationListPage = () => {
  const [specializations, setSpecializations] = useState([])
  useEffect(() => {
    const fetchdataspecializations = async () => {
      try {
        const reponse = await axios.get('http://localhost:5000/api/specializations')
        const resSp = reponse.data;
        setSpecializations(resSp);

      } catch (error) {
        console.error("Lỗi tải dữ liệu", error);
      }
    }
    fetchdataspecializations();
  }, []);


  return (
    <SpecializationList specializations={specializations}/>

  )
}
export default SpecializationListPage;