import { useContext } from "react";
import { toast } from "react-toastify";
import SpecializationManagement from "../../../components/admin/SpecializationManagement/SpecializationManagement";
import { AdminDataContext } from "../Context/AdminDataContext";

const SpecializationManagementPage = () => {
  const { specializations, setSpecializations } = useContext(AdminDataContext);

  // Cập nhật chuyên khoa
  const handleUpdate = async (id, dataUpdate) => {
    try {
      const res = await fetch(`http://localhost:5000/api/specializations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataUpdate)
      });
      if (!res.ok) throw new Error("Cập nhật thất bại");

      const updatedSpecialization = await res.json();

      setSpecializations(prev =>
        prev.map(sp => (sp.id === id ? { ...sp, ...updatedSpecialization } : sp))
      );
      toast.success("Cập nhật thành công");
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật thất bại sss");
    }
  };

  // Xóa chuyên khoa
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/specializations/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Xóa thất bại");
      setSpecializations(prev => prev.filter(sp => sp.id !== id));
      toast.success("Xóa thành công");
    } catch (err) {
      console.error(err);
      toast.error("Xóa thất bại");
    }


  };

  // Thêm chuyên khoa mới
  const handleAdd = async (newSpecialization) => {
    try {
      const res = await fetch("[http://localhost:5000/api/specializations](http://localhost:5000/api/specializations)", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSpecialization)
      });
      const created = await res.json();

      setSpecializations(prev => [...prev, created]);
      toast.success("Thêm chuyên khoa thành công");
    } catch (err) {
      console.error(err);
      toast.error("Thêm thất bại");
    }

  };

  return (<SpecializationManagement
    specializations={specializations}
    onUpdate={handleUpdate}
    onDelete={handleDelete}
    onAdd={handleAdd}
  />
  );
};

export default SpecializationManagementPage;
