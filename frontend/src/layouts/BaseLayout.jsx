import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './BaseLayout.css';

const BaseLayout = () => {
  return (
    <div className="base-layout">
      <header className="header">
        <div className="logo">
          <Link to="/">MEDP</Link>
        </div>
        <nav>
          <Link to="/">Trang chủ</Link>
          <Link to="/doctors">Bác sĩ</Link>
          <Link to="/specializations">Chuyên khoa</Link>
          <Link to="/login">Đăng nhập</Link>
        </nav>
      </header>

      <main className="content">
        <Outlet /> {/* Chỗ này sẽ render các page con */}
      </main>

      <footer className="footer">
        <p>© 2025 Hệ thống Đặt lịch khám - All rights reserved</p>
      </footer>
    </div>
  );
};

export default BaseLayout;
