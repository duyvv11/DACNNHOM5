import { useState } from "react";
import "./UsersManagement.css";

const UsersManagement = ({ users, onDelete, onUpdate }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    password: ""
  });

  const startEdit = (user) => {
    setEditingUser(user.id);
    setEditData(user);
  };

  const handleSave = () => {
    onUpdate(editingUser, editData);
    setEditingUser(null);
  };

  return (
    <div className="Table-UsersManagement">
      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Tuổi</th>
            <th>Giới tính</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Password</th>
            <th>Quản Lý</th>
          </tr>
        </thead>

        <tbody>
          {users.map((us) => (
            <tr key={us.id}>
              {editingUser === us.id ? (
                <>
                  <td>{us.name}</td>
                  <td>{us.age}</td>
                  <td>{us.gender}</td>
                  <td>{us.email}</td>
                  <td><input value={editData.phone} onChange={e => setEditData({ ...editData, phone: e.target.value })} /></td>
                  <td><input value={editData.address} onChange={e => setEditData({ ...editData, address: e.target.value })} /></td>
                  <td><input value={editData.password} onChange={e => setEditData({ ...editData, password: e.target.value })} /></td>

                  <td>
                    <button onClick={handleSave}>Lưu</button>
                    <button onClick={() => setEditingUser(null)}>Hủy</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{us.name}</td>
                  <td>{us.age}</td>
                  <td>{us.gender}</td>
                  <td>{us.email}</td>
                  <td>{us.phone}</td>
                  <td>{us.address}</td>
                  <td>{us.password}</td>
                  <td>
                    <button onClick={() => startEdit(us)}>Sửa</button>
                    <button onClick={() => onDelete(us.id)}>Xóa</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersManagement;
