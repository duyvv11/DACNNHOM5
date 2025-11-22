import { useEffect, useState, useContext } from "react";
import DoctorsManagement from "../../../components/admin/DoctorsManagement/DoctorManagement";
import { toast } from "react-toastify";
import { AdminDataContext } from "../Context/AdminDataContext";

const DoctorsManagementPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Lấy hospitals và specializations từ context
  const { hospitals, specializations, loading: contextLoading } = useContext(AdminDataContext);

  // load data bác sĩ
  const fetchDataDoctors = async () => {
    try {
      const dts = await fetch('http://localhost:5000/api/doctors/');
      const dataDoctors = await dts.json();
      setDoctors(dataDoctors);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  // deletedoctor
  const handleDeleteDoctor = async (id) => {
    try {
      const dt = await fetch(`http://localhost:5000/api/doctors/${id}`, {
        method: "DELETE",
      });
      if (dt.ok) {
        toast.success("Đã xóa thành công");
        fetchDataDoctors();
      } else {
        toast.error("Xóa thất bại");
      }
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi xảy ra");
    }
  };

  // updatedoctor
  const handleUpdateDoctor = async (id, updatedData) => {
    console.log(updatedData);
    try {
      await fetch(`http://localhost:5000/api/doctors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      fetchDataDoctors();
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật thất bại");
    }
  };

  useEffect(() => {
    fetchDataDoctors();
  }, []);

  if (isLoading || contextLoading) {
    return <p>Đang tải dữ liệu</p>;
  }

  return (
    <DoctorsManagement
      doctors={doctors}
      onDelete={handleDeleteDoctor}
      onUpdate={handleUpdateDoctor}
      hospitals={hospitals}
      specializations={specializations}
    />
  );
};

export default DoctorsManagementPage;
