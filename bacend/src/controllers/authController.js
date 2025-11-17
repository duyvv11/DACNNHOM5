// const { User } = require('../models');
// // const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken'); 

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Kiểm tra email
//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(404).json({ message: 'Email không tồn tại' });
//     }

//     //Kiểm tra mật khẩu
//     const isMatch = password === user.password;
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Sai mật khẩu' });
//     }

//     // Tạo token
//     const token = jwt.sign(
//       {
//         id: user.id,
//         email: user.email,
//         role: user.role
//       },
//       process.env.JWT_SECRET || "SECRET_KEY",
//       { expiresIn: "2h" }
//     );

//     // Trả về token + user info
//     res.json({
//       message: 'Đăng nhập thành công',
//       token: token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };
