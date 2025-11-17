import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [editData, setEditData] = useState({});

  // --- 1. HOOK TẢI DỮ LIỆU BAN ĐẦU (Không cần Token) ---
  useEffect(() => {
    const fetchUserProfile = async () => {

      if (!id) {
        setStatusMessage({ type: 'error', message: 'Thiếu ID người dùng.' });
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/users/${id}`);

        const user = response.data;

        setUserData(user);
        setEditData(user);
        setIsLoading(false);

      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Không thể tải thông tin người dùng. Vui lòng kiểm tra API.';
        setStatusMessage({ type: 'error', message: errorMessage });
        setIsLoading(false);
      }
    };

    fetchUserProfile();

  }, [id]);

  // --- 2. HÀM XỬ LÝ CHỈNH SỬA VÀ LƯU (Không cần Token) ---

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setEditData(userData);
    setIsEditing(true);
    setStatusMessage(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(userData);
    setStatusMessage(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatusMessage(null);


    try {
      // ✅ BỎ headers/Token khỏi yêu cầu PUT
      await axios.put(`http://localhost:5000/api/users/${id}`, {
        email: editData.email,
        phone: editData.phone,
        address: editData.address,}
      );

      setUserData(editData);
      setIsEditing(false);
      setStatusMessage({ type: 'success', message: 'Cập nhật thông tin thành công!' });

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Lỗi cập nhật. Vui lòng kiểm tra kết nối.';
      setStatusMessage({ type: 'error', message: errorMessage });
    }
  };

  // --- 3. LOGIC HIỂN THỊ ---

  if (isLoading) {
    return <div className="profile-container"><p>Đang tải thông tin...</p></div>;
  }

  if (!userData) {
    return <div className="profile-container"><p className="status-message error">Không tìm thấy dữ liệu người dùng.</p></div>;
  }


  return (
    <div className="profile-container">
      <h2>Thông Tin Cá Nhân</h2>

      {statusMessage && (
        <p className={`status-message ${statusMessage.type}`}>
          {statusMessage.message}
        </p>
      )}

      <div className="profile-info-static">
        <p><strong>Họ và Tên:</strong> {userData.name || 'N/A'}</p>
        <p><strong>Tuổi:</strong> {userData.age || 'N/A'}</p>
        <p><strong>Giới Tính:</strong> {userData.gender || 'N/A'}</p>
      </div>

      <hr />

      <form onSubmit={handleSave} className="profile-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          {isEditing ? (
            <input
              type="email"
              id="email"
              name="email"
              value={editData.email || ''}
              onChange={handleChange}
              required
            />
          ) : (
            <p className="profile-value">{userData.email}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Số Điện Thoại</label>
          {isEditing ? (
            <input
              type="text"
              id="phone"
              name="phone"
              value={editData.phone || ''}
              onChange={handleChange}
              required
            />
          ) : (
            <p className="profile-value">{userData.phone}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address">Địa Chỉ</label>
          {isEditing ? (
            <textarea
              id="address"
              name="address"
              value={editData.address || ''}
              onChange={handleChange}
              required
            ></textarea>
          ) : (
            <p className="profile-value">{userData.address}</p>
          )}
        </div>

        <div className="profile-actions">
          {isEditing ? (
            <>
              <button type="submit" className="button-save">Lưu Thay Đổi</button>
              <button type="button" onClick={handleCancel} className="button-cancel">Hủy</button>
            </>
          ) : (
            <button type="button" onClick={handleEdit} className="button-edit">Chỉnh Sửa</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserProfile;