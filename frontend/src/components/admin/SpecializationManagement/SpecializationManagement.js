import { useState } from "react";

const SpecializationManagement = ({ specializations, onUpdate, onDelete, onAdd }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [newSpecialization, setNewSpecialization] = useState({
    name: "",
    description: "",
    image_url: ""
  });

  // Bắt đầu sửa
  const startEdit = (sp) => {
    setEditingId(sp.id);
    setEditData({
      name: sp.name,
      description: sp.description,
      image_url: sp.image_url || ""
    });
  };

  // Lưu sửa
  const handleSave = (id) => {
    onUpdate(id, editData);
    setEditingId(null);
  };

  // Thêm mới
  const handleAdd = () => {
    onAdd(newSpecialization);
    setNewSpecialization({ name: "", description: "", image_url: "" });
  };

  return (<div className="Table-AdminManagement"> <h3>Thêm Chuyên Khoa Mới</h3>
    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
      <input placeholder="Tên" value={newSpecialization.name} onChange={e => setNewSpecialization({ ...newSpecialization, name: e.target.value })} />
      <input placeholder="Mô tả" value={newSpecialization.description} onChange={e => setNewSpecialization({ ...newSpecialization, description: e.target.value })} />
      <input placeholder="URL Hình ảnh" value={newSpecialization.image_url} onChange={e => setNewSpecialization({ ...newSpecialization, image_url: e.target.value })} /> <button onClick={handleAdd}>Thêm</button> </div>

    ```
    <table>
      <thead>
        <tr>
          <td>Tên Chuyên Khoa</td>
          <td>Mô tả</td>
          <td>Hình ảnh</td>
          <td>Quản Lý</td>
        </tr>
      </thead>
      <tbody>
        {specializations.map(sp => (
          <tr key={sp.id}>
            {editingId === sp.id ? (
              <>
                <td><input value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} /></td>
                <td><input value={editData.description} onChange={e => setEditData({ ...editData, description: e.target.value })} /></td>
                <td><input value={editData.image_url} onChange={e => setEditData({ ...editData, image_url: e.target.value })} /></td>
                <td>
                  <button onClick={() => handleSave(sp.id)}>Lưu</button>
                  <button onClick={() => setEditingId(null)}>Hủy</button>
                </td>
              </>
            ) : (
              <>
                <td>{sp.name}</td>
                <td>{sp.description}</td>
                <td>
                  {sp.image_url && <img src={sp.image_url} alt="chuyên khoa" className="image-hn" />}
                </td>
                <td>
                  <button onClick={() => startEdit(sp)}>Sửa</button>
                  <button onClick={() => onDelete(sp.id)}>Xóa</button>
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

export default SpecializationManagement;
