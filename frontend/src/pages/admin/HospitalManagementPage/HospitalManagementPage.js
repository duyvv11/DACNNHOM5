import HospitalManagement from "../../../components/admin/HospitalsManagement.js/HospitalsManagement";
import { useContext } from "react";
import { AdminDataContext } from "../Context/AdminDataContext";
import { toast } from "react-toastify"; 
const HospitalManagementPage =()=>{
  const { hospitals ,setHospitals} = useContext(AdminDataContext);

  const handleUpdateHospital = async(id,dataupdate)=>{
    const upHospital = await fetch(`http://localhost:5000/api/hospitals/${id}`,
      {
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(dataupdate)
      }
    );
    if(upHospital){
      toast("Cập nhật thành công");
      setHospitals(prev =>
        prev.map(h => (h.id === id ? { ...h, ...dataupdate } : h))
      );

    }
    else{
      toast("Cập nhật thất bại");
    }
  };
  // su kien them 
  const handleAddHostpital= async(newHospital)=>{
    try {
      const addHospital = await fetch('http://localhost:5000/api/hospitals', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHospital)
      });
      if (addHospital.ok) {
        const addedHospital = await addHospital.json(); 
        setHospitals(prev => [...prev, addedHospital]); 
        toast("thêm bệnh viện thành công");

      }
      else {
        toast("thêm bệnh viện không thành công");
      }
      
    } catch (error) {
      toast("Lỗi thêm ")
    }
    
  };
  // su kien xoa
  const handleDeleteHospital = async (hospitalId)=>{
    try {
      const deleteHospital = await fetch(`http://localhost:5000/api/hospitals/${hospitalId}`, {
        method: "DELETE"
      });
      if (deleteHospital.ok) {
        setHospitals(prev => prev.filter(h => h.id !== hospitalId));
        toast("Xóa bệnh viện thành công")
      }
      else {
        toast("xóa không thành công");
      }
      
    } catch (error) {
      toast("lỗi xóa");
    }

  }

  return(
    <>
    
    <HospitalManagement hospitals={hospitals }
    onUpdate={handleUpdateHospital}
    onAdd={handleAddHostpital}
    onDelete={handleDeleteHospital}
    />
    </>

  )
}
export default HospitalManagementPage;