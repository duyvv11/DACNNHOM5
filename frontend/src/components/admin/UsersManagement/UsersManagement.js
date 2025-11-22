import { useState, useContext  } from "react";
import "../TableManagement.css";
import { toast } from "react-toastify";
import { AdminDataContext } from "../../../pages/admin/Context/AdminDataContext";

const UsersManagement = ({ users, onDelete, onUpdate, onCreateDoctor }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [doctorModalUser, setDoctorModalUser] = useState(null);
  const { hospitals, specializations } = useContext(AdminDataContext);

  const [editData, setEditData] = useState({
    phone: "",
    address: "",
    role: ""
  });

  const [doctorForm, setDoctorForm] = useState({
    userId: "",
    experience_years: "",
    title: "",
    workplace: "",
    work_hours: "",
    license_image: "",
    profile_image: "",
    status: "PENDING",
    hospitalId: "",
    specializationId: ""
  });

  // Sửa user
  const startEdit = (user) => {
    setEditingUser(user.id);
    setEditData(user);
  };

  const handleSave = () => {
    onUpdate(editingUser, editData);
    setEditingUser(null);
  };

  const handleCancelEdit = () => setEditingUser(null);

  // Mở modal tạo bác sĩ
  const handleUpgradeToDoctor = (user) => {
    const confirmAction = window.confirm(
      `Bạn có chắc muốn cấp quyền Bác Sĩ cho tài khoản ${user.name}?`
    );
    if (confirmAction) {
      setDoctorModalUser(user);
      setDoctorForm({ ...doctorForm, userId: user.id });
    } else {
      toast.info("Hủy cấp quyền Bác Sĩ");
    }
  };

  // Tạo bác sĩ
  const handleCreateDoctor = () => {
    onCreateDoctor(doctorForm);
    setDoctorModalUser(null);
    toast.success("Tài khoản đã được cấp quyền Bác Sĩ!");
  };

  return (
    <div className="Table-AdminManagement">
      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Tuổi</th>
            <th>Giới tính</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Role</th>
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
                  <td>{editData.role}</td>
                  <td>
                    <button onClick={handleSave}>Lưu</button>
                    <button onClick={handleCancelEdit}>Hủy</button>
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
                  <td>{us.role}</td>
                  <td>
                    <button onClick={() => startEdit(us)}>Sửa</button>
                    <button onClick={() => onDelete(us.id)}>Xóa</button>
                    {us.role !== "DOCTOR" && (
                      <button onClick={() => handleUpgradeToDoctor(us)}>Cấp TK Bác Sĩ</button>
                    )}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal nhập liệu tạo bác sĩ */}
      {doctorModalUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Cấp quyền Bác Sĩ cho: {doctorModalUser.name}</h3>
            <label>Kinh nghiệm năm: </label>
            <input
              type="number"
              value={doctorForm.experience_years}
              onChange={e => setDoctorForm({ ...doctorForm, experience_years: e.target.value })}
            />
            <label>Chức danh (Title): </label>
            <input
              value={doctorForm.title}
              onChange={e => setDoctorForm({ ...doctorForm, title: e.target.value })}
            />
            <label>Nơi làm việc: </label>
            <input
              value={doctorForm.workplace}
              onChange={e => setDoctorForm({ ...doctorForm, workplace: e.target.value })}
            />
            <label>Giờ làm việc: </label>
            <input
              value={doctorForm.work_hours}
              onChange={e => setDoctorForm({ ...doctorForm, work_hours: e.target.value })}
            />
            <label>License Image URL: </label>
            <input
              value={doctorForm.license_image}
              onChange={e => setDoctorForm({ ...doctorForm, license_image: e.target.value })}
            />
            <label>Profile Image URL: </label>
            <input
              value={doctorForm.profile_image}
              onChange={e => setDoctorForm({ ...doctorForm, profile_image: e.target.value })}
            />
            <label>Chọn Bệnh Viện:</label>
            <select
              value={doctorForm.hospitalId}
              onChange={(e) =>
                setDoctorForm({ ...doctorForm, hospitalId: e.target.value })
              }
            >
              <option value="">-- Chọn bệnh viện --</option>
              {hospitals.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>

            <label>Chọn Chuyên Khoa:</label>
            <select
              value={doctorForm.specializationId}
              onChange={(e) =>
                setDoctorForm({ ...doctorForm, specializationId: e.target.value })
              }
            >
              <option value="">-- Chọn chuyên khoa --</option>
              {specializations.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <div style={{ marginTop: "10px" }}>
              <button onClick={handleCreateDoctor}>Tạo Bác Sĩ</button>
              <button onClick={() => setDoctorModalUser(null)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
