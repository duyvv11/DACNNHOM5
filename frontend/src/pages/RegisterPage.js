import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Mật khẩu và Xác nhận mật khẩu không khớp.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        name,
        email,
        password
      });

      navigate('/login', { state: { message: 'Đăng ký thành công! Vui lòng đăng nhập.' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Login-Section">  {/* Dùng class từ CSS */}
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
