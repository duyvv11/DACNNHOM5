import { useState } from "react";
import "../TableManagement.css";


const DoctorManagement = ({ doctors, onDelete, onUpdate ,hospitals,specializations }) => {
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [editData, setEditData] = useState({});

  // Bắt đầu sửa
  const startEdit = (doctor) => {
    setEditingDoctor(doctor.id);
    setEditData({
      name: doctor.User?.name || "",
      experience_years: doctor.experience_years || "",
      title: doctor.title || "",
      workplace: doctor.workplace || "",
      work_hours: doctor.work_hours || "",
      license_image: doctor.license_image || "",
      profile_image: doctor.profile_image || "",
      status: doctor.status || "",
      hospitalId:doctor.Hospital.id,
      specializationId:doctor.Specialization.id
    });
  };

  // Lưu sửa
  const handleSave = () => {
    onUpdate(editingDoctor, editData);
    setEditingDoctor(null);
  };

  return (
    <div className="Table-AdminManagement">
      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Kinh Nghiệm</th>
            <th>Mô tả</th>
            <th>Nơi Làm Việc</th>
            <th>Giờ Làm Việc</th>
            <th>Chứng chỉ hành nghề</th>
            <th>ProfileImage</th>
            <th>Trạng Thái</th>
            <th>Bệnh Viện </th>
            <th>Chuyên Khoa</th>
            <th>Quản Lý</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              {editingDoctor === doctor.id ? (
                <>
                  <td><input value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} /></td>
                  <td><input value={editData.experience_years} onChange={e => setEditData({ ...editData, experience_years: e.target.value })} /></td>
                  <td><input value={editData.title} onChange={e => setEditData({ ...editData, title: e.target.value })} /></td>
                  <td><input value={editData.workplace} onChange={e => setEditData({ ...editData, workplace: e.target.value })} /></td>
                  <td><input value={editData.work_hours} onChange={e => setEditData({ ...editData, work_hours: e.target.value })} /></td>
                  <td><input value={editData.license_image} onChange={e => setEditData({ ...editData, license_image: e.target.value })} /></td>
                  <td><input value={editData.profile_image} onChange={e => setEditData({ ...editData, profile_image: e.target.value })} /></td>
                  <td><input value={editData.status} onChange={e => setEditData({ ...editData, status: e.target.value })} /></td>
                  {/* Bệnh viện */}
                  <td>
                    <select
                      value={doctor.Hospital.id}
                      onChange={e => setEditData({ ...editData, hospitalId: e.target.value })}>
                      {hospitals.map((ht) => (
                        <option key={ht.id} value={ht.id}>
                          {ht.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <select
                      value={doctor.Specialization.id}
                      onChange={e => setEditData({ ...editData, specializationId: e.target.value })}
                    >
                      {specializations.map((sp) => (
                        <option key={sp.id} value={sp.id}>
                          {sp.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <button onClick={handleSave}>Lưu</button>
                    <button onClick={() => setEditingDoctor(null)}>Hủy</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{doctor.User?.name}</td>
                  <td>{doctor.experience_years}</td>
                  <td>{doctor.title}</td>
                  <td>{doctor.workplace}</td>
                  <td>{doctor.work_hours}</td>
                  <td>
                    {doctor.license_image && <img src={doctor.license_image} alt="hinhchungchi" className="image-hn" />}
                  </td>
                  <td>
                    {doctor.profile_image && <img src={doctor.profile_image} alt="hinhbacsi" className="image-dt" />}
                  </td>
                  <td>{doctor.status}</td>
                  <td>{doctor.Hospital?.name}</td>
                  <td>{doctor.Specialization?.name}</td>
                  <td>
                    <button onClick={() => startEdit(doctor)}>Sửa</button>
                    <button onClick={() => onDelete(doctor.id)}>Xóa</button>
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

export default DoctorManagement;
