import { useState } from "react";

const HospitalManagement = ({ hospitals, onUpdate, onDelete, onAdd }) => {
const [editingHospital, setEditingHospital] = useState(null);
const [editData, setEditData] = useState({});
const [newHospital, setNewHospital] = useState({
name: "",
address: "",
phone: "",
email: "",
description: "",
type: "",
image_hospital: ""
});

// Bắt đầu sửa
const startEdit = (hospital) => {
setEditingHospital(hospital.id);
setEditData({
phone: hospital.phone || "",
email: hospital.email || "",
description:hospital.description ||"",
image_hospital: hospital.image_hospital || ""
});
};

// Lưu sửa
const handleSave = (id) => {
onUpdate(id, editData);
setEditingHospital(null);
};

// Thêm bệnh viện mới
const handleAdd = () => {
onAdd(newHospital);
setNewHospital({
name: "",
address: "",
phone: "",
email: "",
description: "",
type: "",
image_hospital: ""
});
};

return ( <div className="Table-AdminManagement"> <h3>Thêm bệnh viện mới</h3>
<div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
<input placeholder="Tên" value={newHospital.name} onChange={e => setNewHospital({ ...newHospital, name: e.target.value })} />
<input placeholder="Địa chỉ" value={newHospital.address} onChange={e => setNewHospital({ ...newHospital, address: e.target.value })} />
<input placeholder="SDT" value={newHospital.phone} onChange={e => setNewHospital({ ...newHospital, phone: e.target.value })} />
<input placeholder="Email" value={newHospital.email} onChange={e => setNewHospital({ ...newHospital, email: e.target.value })} />
<input placeholder="Thông tin" value={newHospital.description} onChange={e => setNewHospital({ ...newHospital, description: e.target.value })} />
<input placeholder="BV/PKT" value={newHospital.type} onChange={e => setNewHospital({ ...newHospital, type: e.target.value })} />
<input placeholder="Hình ảnh" value={newHospital.image_hospital} onChange={e => setNewHospital({ ...newHospital, image_hospital: e.target.value })} /> <button onClick={handleAdd}>Thêm</button> </div>

```
  <table>
    <thead>
      <tr>
        <td>Tên</td>
        <td>Địa Chỉ</td>
        <td>SDT</td>
        <td>Email</td>
        <td>Thông Tin</td>
        <td>BV/PKT</td>
        <td>Hình Ảnh</td>
        <td>Quản Lý</td>
      </tr>
    </thead>
    <tbody>
      {hospitals.map((hpt) => (
        <tr key={hpt.id}>
          <td>{hpt.name}</td>
          <td>{hpt.address}</td>

          {editingHospital === hpt.id ? (
            <>
              <td><input value={editData.phone} onChange={e => setEditData({ ...editData, phone: e.target.value })} /></td>
              <td><input value={editData.email} onChange={e => setEditData({ ...editData, email: e.target.value })} /></td>
              <td><input value={editData.description} onChange={e => setEditData({ ...editData, description: e.target.value })} /></td>
              <td>{hpt.type}</td>
              <td><input value={editData.image_hospital} onChange={e => setEditData({ ...editData, image_hospital: e.target.value })} /></td>
              <td>
                <button onClick={() => handleSave(hpt.id)}>Lưu</button>
                <button onClick={() => setEditingHospital(null)}>Hủy</button>
              </td>
            </>
          ) : (
            <>
              <td>{hpt.phone}</td>
              <td>{hpt.email}</td>
              <td>{hpt.description}</td>
              <td>{hpt.type}</td>
              <td>{hpt.image_hospital}</td>
              <td>
                <button onClick={() => startEdit(hpt)}>Sửa</button>
                <button onClick={() => onDelete(hpt.id)}>Xóa</button>
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

export default HospitalManagement;
