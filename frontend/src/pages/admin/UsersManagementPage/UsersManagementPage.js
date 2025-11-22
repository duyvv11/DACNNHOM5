import { useEffect, useState, useContext } from "react";
import { AdminDataContext } from "../Context/AdminDataContext";
import UsersManagement from "../../../components/admin/UsersManagement/UsersManagement";
const UsersManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  // Lấy dữ liệu chung từ context
  const { hospitals, specializations, loading: loadingAdminData } = useContext(AdminDataContext);

  // load users
  const fetchDataUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/");
      const data = await response.json();
      setUsers(data);
      setIsLoadingUsers(false);
    } catch (err) {
      console.error("Lỗi fetch users:", err);
      setIsLoadingUsers(false);
    }
  };

  // delete user
  const handleDeleteUser = async (id) => {
    await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
    fetchDataUsers();
  };

  // update user
  const handleUpdateUser = async (id, updatedData) => {
    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    fetchDataUsers();
  };

  // create doctor
  const handleCreateDoctor = async (doctorData) => {
    console.log(doctorData);
    await fetch("http://localhost:5000/api/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctorData),
    });
    fetchDataUsers(); 
  };

  // load lần đầu
  useEffect(() => {
    fetchDataUsers();
  }, []);

  if (isLoadingUsers || loadingAdminData) return <p>Đang tải dữ liệu...</p>;

  return (
    <UsersManagement
      users={users}
      onDelete={handleDeleteUser}
      onUpdate={handleUpdateUser}
      onCreateDoctor={handleCreateDoctor}
      hospitals={hospitals}
      specializations={specializations}
    />
  );
};

export default UsersManagementPage;
