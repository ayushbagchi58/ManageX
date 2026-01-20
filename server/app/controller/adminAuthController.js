const { comparePassword } = require("../helper/adminAuthHelper");
const { statusCodes } = require("../helper/statusCodes");
const Admin = require("../model/adminAuthModel");
const jwt = require("jsonwebtoken");
const Employee=require("../model/EmployeeModel")
class adminAuthController {
  async adminLogin(req, res) {
    try {
      const { email, password } = req.body;
      //validate
      if (!email || !password) {
        return res.status(statusCodes.BAD_REQUEST).json({
          message: "All fields are required",
        });
      }

      //check admin exists or not
      const admin = await Admin.findOne({ email });
      console.log("admin data", admin);
      if (!admin) {
        return res.status(statusCodes.UNAUTHORIZED).json({
          status: false,
          message: "Invalid credentials",
        });
      }

      //compare password
      const isMatched = await comparePassword(password, admin.password);
      if (!isMatched) {
        return res.status(statusCodes.UNAUTHORIZED).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      //generate token
      const token = jwt.sign(
        {
          _id: admin._id,
          role: admin.role,
        },
        process.env.JWT_SECRET || "1234",
        { expiresIn: "1d" }
      );

      return res.status(statusCodes.OK).json({
        message: "Admin logged-in successfully!",
        admin: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
        token:token
      });
    } catch (error) {
      return res.status(statusCodes.SERVER_ERROR).json({
        message: "Server error",
      });
    }
  }


async adminDashboard(req, res) {
  try {
    const admin = await Admin.findById(req.user._id).select("-password")

    
    const totalEmployees = await Employee.countDocuments()
    const activeEmployees = await Employee.countDocuments({ isActive: true })
    const inactiveEmployees = await Employee.countDocuments({ isActive: false })

    
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    )

    const newThisMonth = await Employee.countDocuments({
      createdAt: { $gte: startOfMonth }
    })

   
    const recentEmployees = await Employee.find()
      .select("name email role createdAt")
      .sort({ createdAt: -1 })
      .limit(5)

    return res.status(statusCodes.OK).json({
      message: `Welcome back, ${admin.name} 👋`,
      admin,
      stats: {
        totalEmployees,
        activeEmployees,
        inactiveEmployees,
        newThisMonth,
      },
      recentEmployees
    })

  } catch (error) {
    return res.status(statusCodes.SERVER_ERROR).json({
      message: "Server error"
    })
  }
}

}
module.exports = new adminAuthController();
