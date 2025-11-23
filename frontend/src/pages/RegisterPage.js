import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import { toast } from 'react-toastify';

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Mật khẩu và Xác nhận mật khẩu không khớp.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
        age, 
        gender, 
        phone,
        address 
      });
      if(response.status ===201 || response.status ===200){
        toast("Đăng ký thành công chuyển sang trang đăng nhập")
      }
      setTimeout(()=>{
        navigate("/login");
      },2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Login-Section"> 
      <h2>Đăng Ký Tài Khoản</h2>

      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <label htmlFor="name">Tên hiển thị</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên của bạn"
          required
        />
        <label htmlFor="age">Tuổi</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Nhập tuổi của bạn"
          min="1" // Giới hạn tuổi tối thiểu
          required
        />

        <label htmlFor="gender">Giới tính</label>
        <select className="select-gt"
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Chọn giới tính</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>

        <label htmlFor="phone">Số điện thoại</label>
        <input
          type="tel" 
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Nhập số điện thoại"
          required
        />

        <label htmlFor="address">Địa chỉ</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Nhập địa chỉ của bạn"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email hợp lệ"
          required
        />

        <label htmlFor="password">Mật khẩu</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ít nhất 6 ký tự"
          required
          minLength="6"
        />

        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Nhập lại mật khẩu"
          required
          minLength="6"
        />

        <button type="submit" className="Button-Use" disabled={loading}>
          {loading ? 'Đang đăng ký...' : 'Đăng ký tài khoản'}
        </button>

        <p className="register-link">
          Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>

      </form>
    </div>
  );
}

export default RegisterPage;
