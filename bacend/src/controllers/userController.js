const  {User,Doctor}  = require('../models/');
const bcrypt = require('bcryptjs');

//admin
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) { res.status(500).json({ error: err.message }); }
};
//dang nhap
exports.postLogin = async (req,res) =>{
  try {
    const {email,password} = req.body;
    const user = await User.findOne({where:{email:email}});
    const checkpassowrd =await bcrypt.compare(password, user.password);
    if(!user || !checkpassowrd){
      return res.status(401).json({msg:"sai email hoặc mật khẩu"});
    }
    else{
      return res.status(200).json({msg:"đăng nhập thành công ",
        user:{
          email:user.email,
          role:user.role,
          id:user.id,
          name:user.name,
        }
      });
    }
    
  } catch (error) {
    return res.json({msg:"lỗi sever",error});
    
  }
}

// dang ky
exports.postRegister = async (req,res)=>{
  try {
    const {name,age,gender,email,phone,address,password ,role} = req.body;
    const checkuser = await User.findOne({where:{email:email}})
    if(checkuser) return res.json("tai khoan da ton tai");
    const hashpassword = await bcrypt.hash(password,10);
    const user = await User.create({name,age,gender,email,phone,address,password:hashpassword,role:role || "USER"});
    if(user){
      return res.status(200).json({msg:"tạo tài khoản thành công",data:user});
    }
    
  } catch (error) {
    return res.json ({msg:"lỗi tạo tk ",l:error})
    
  }
}

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id,{
        attributes:['name','email','phone','address']
    });
    if (!user) return res.status(404).json({ message: 'Không tìm thấy user' });
    res.json(user);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashed = password ? await bcrypt.hash(password, 10) : null;
    const user = await User.create({ ...rest, password: hashed });
    res.status(201).json(user);
  } catch (err) { res.status(400).json({ error: err.message }); }
};

// cap nhat thong tin cho user benh nhan
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Không tìm thấy user' });

    const allowedFields = ['phone', 'address', 'password'];
    

    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
    );

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    await user.update(updates);
    res.json({
        msg:"ok",
        email:user.email,
        phone:user.phone,
        adress:user.address,
        password:user.password});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Cấp role DOCTOR 
exports.putRoleDoctor = async (req, res) => {
  const userId = req.params.id;

  // Cập nhật role trong bảng User
  await User.update({ role: "DOCTOR" }, { where: { id: userId } });

  // Tạo Doctor record nếu chưa có
  const existingDoctor = await Doctor.findOne({ where: { userId } });
  if (!existingDoctor) {
    await Doctor.create({
      userId,
      experience_years: 0,
      title: "",
      workplace: "",
      work_hours: "",
      status: "PENDING"
    });
  }

  res.json({ message: "User upgraded to doctor" });
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Không tìm thấy user' });
    await user.destroy();
    res.json({ message: 'Đã xóa user' });
  } catch (err) { res.status(500).json({ error: err.message }); }
  };
  
