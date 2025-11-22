import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";   // <- IMPORT QUAN TRỌNG
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const navigate = useNavigate();

  // Lấy login() từ Context
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      const data = response.data;
      console.log(data);

      // Lưu thêm email, name nếu bạn muốn
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("name", data.user.name);

      // Đưa trạng thái vào Context
      login(data.user.id, data.user.role);

      toast.success("Đăng nhập thành công!");
      window.dispatchEvent(new Event("loginStatusChange"));
      navigate("/");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Đăng nhập thất bại.");
      } else {
        setError("Lỗi kết nối máy chủ.");
      }
    }
  };

  return (
    <div className="Login-Section">
      <h2>Đăng Nhập</h2>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="input-email">Email</label>
        <input
          id="input-email"
          type="email"
          placeholder="Nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="input-password">Mật Khẩu</label>
        <input
          id="input-password"
          type="password"
          placeholder="Nhập password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="Button-Use" type="submit">
          Đăng Nhập
        </button>

        <p className="forgot-password">
          Quên mật khẩu? <Link to="/reset-password">Đặt lại tại đây</Link>
        </p>
        <p className="register-link">
          Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
