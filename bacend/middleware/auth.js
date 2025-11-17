const jwt = require("jsonwebtoken");

// Middleware bảo vệ API
module.exports = (req, res, next) => {
  // Lấy token từ header
  const authHeader = req.headers.authorization;

  // Nếu không có token
  if (!authHeader)
    return res.status(401).json({ message: "Không có token, vui lòng đăng nhập" });

  // Token dạng: Bearer token123 nên cần bỏ chữ "Bearer "
  const token = authHeader.replace("Bearer ", "");

  try {
    // Kiểm tra token có hợp lệ không
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY");

    // Lưu thông tin user vào req để dùng ở controller
    req.user = decoded;

    // Cho phép đi tiếp
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};
