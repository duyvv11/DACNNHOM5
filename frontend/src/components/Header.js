import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

// kiểm tra đăng nhập từ localstorage
const checkLoginStatus = () => {
  return localStorage.getItem('id') !== null;
};
const checkIsDoctor = () =>{
  return localStorage.getItem('role') === "DOCTOR" ;
};

function Header() {
  const id = localStorage.getItem('id');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(checkLoginStatus());
  const [isDoctor,setIsDoctor] = useState(checkIsDoctor())

  // useEffect để lắng nghe sự thay đổi của localStorage
  useEffect(() => {
    const updateState = () => {
      setIsLoggedIn(checkLoginStatus());
      setIsDoctor(checkIsDoctor());
    };

    window.addEventListener("loginStatusChange", updateState);

    return () => {
      window.removeEventListener("loginStatusChange", updateState);
    };
  }, []);

  // Hàm xử lý Đăng xuất
  const handleLogout = (e) => {
    e.preventDefault(); 

    // Xóa token hoặc thông tin đăng nhập khỏi localStorage
    localStorage.removeItem('id');
    localStorage.removeItem('role');

    // Cập nhật trạng thái
    setIsLoggedIn(false);
    setIsDoctor(false)
    window.dispatchEvent(new Event("loginStatusChange"));
    // Chuyển hướng về trang chủ hoặc trang đăng nhập
    navigate('/');
    // Nếu muốn tải lại trang: window.location.reload();
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">MEDP</Link>
      </div>

      <div className="section-Search">
        <form className="Form-Seach">
          <input type="text" placeholder="Tìm kiếm..."></input>
        </form>
        <button type="submit">Tìm Kiếm</button>
      </div>

      <nav>
        <Link to="/doctors">Bác sĩ</Link>
        <Link to="/specializations">Chuyên khoa</Link>
        <Link to="/hospitals">Phòng Khám/Bệnh Viện</Link>

        {isLoggedIn ? (
          <>
            <Link to={`/profile/${id}`} >Thông tin cá nhân</Link>
            <Link to="/my-appointments">Theo dõi lịch khám của tôi</Link>
            {isDoctor && (
              <Link to="/pagedoctor" >Trang của bác sĩ</Link>
            )}
            <Link to="#" onClick={handleLogout}>
              Đăng xuất
            </Link>
          </>
        ) : (
          <Link to="/login">Đăng nhập</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;