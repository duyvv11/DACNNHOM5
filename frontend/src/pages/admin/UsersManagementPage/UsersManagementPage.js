import { useEffect ,useState } from "react";
import UsersManagement from "../../../components/admin/UsersManagement/UsersManagement";
const UsersManagementPage = () =>{
  const [users,setUsers]= useState([]);
  const [isLoading,setIsLoading] = useState(true)
// load data
  const fetchDataUsers = async()=>{
    const reponse = await fetch('http://localhost:5000/api/users/');
    const data = await reponse.json();
    setUsers(data);
    if(reponse){
      setIsLoading(false);
    }
  }

//deleteuser 
  const handleDeleteUser = async (id) => {
    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE",
    });
    fetchDataUsers(); 
  };

  // updateuser
  const handleUpdateUser = async (id, updatedData) => {
    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    fetchDataUsers(); 
  };

  // load lần đầu
  useEffect(()=>{
    fetchDataUsers()
  },[])
  return (
    <>
    {isLoading ? (
      <p>Đang tải dữ liệu</p>
    ):
    (
      <UsersManagement users={users} onDelete={handleDeleteUser} onUpdate={handleUpdateUser}/>
    )
    }
      
    </>
  )
}
export default UsersManagementPage;