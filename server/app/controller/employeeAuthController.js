const { comparePassword, hashedPassword } = require("../helper/adminAuthHelper")
const { statusCodes } = require("../helper/statusCodes")
const Employee = require("../model/EmployeeModel")
const jwt = require("jsonwebtoken")

class employeeAuthController {

  async employeeLogin(req, res) {
    try {
      const { email, password } = req.body

      //  Validate
      if (!email || !password) {
        return res.status(statusCodes.BAD_REQUEST).json({
          message: "Email and password are required",
        })
      }

      //  Check employee exists
      const employee = await Employee.findOne({ email })
      if (!employee) {
        return res.status(statusCodes.UNAUTHORIZED).json({
          message: "Invalid credentials",
        })
      }

      //  Check active status
      if (!employee.isActive) {
        return res.status(statusCodes.FORBIDDEN).json({
          message: "Account is deactivated. Contact admin.",
        })
      }

      //  Account lock check
      if (employee.lockUntil && employee.lockUntil > Date.now()) {
        return res.status(statusCodes.FORBIDDEN).json({
          message: "Account locked due to multiple failed attempts. Try later.",
        })
      }

      //  Compare password
      const isMatch = await comparePassword(password, employee.password)

      if (!isMatch) {
        employee.failedAttempts += 1

        // lock account after 5 attempts
        if (employee.failedAttempts >= 5) {
          employee.lockUntil = Date.now() + 15 * 60 * 1000 
        }

        await employee.save()

        return res.status(statusCodes.UNAUTHORIZED).json({
          message: "Invalid credentials",
        })
      }

      //  Success login → reset counters
      employee.failedAttempts = 0
      employee.lockUntil = null
      employee.lastLogin = new Date()
      await employee.save()

      // Generate token
      const token = jwt.sign(
        {
          _id: employee._id,
          role: "employee",
        },
        process.env.JWT_SECRET || "1234",
        { expiresIn: "1d" }
      )

      return res.status(statusCodes.OK).json({
        message: "Employee logged in successfully",
        token,
        employee: {
          _id: employee._id,
          employeeId: employee.employeeId,
          name: employee.name,
          email: employee.email,
          role: employee.role,
          isFirstLogin: employee.isFirstLogin,
        },
      })

    } catch (error) {
      return res.status(statusCodes.SERVER_ERROR).json({
        message: error.message,
      })
    }
  }
async changePassword(req, res) {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body
 const employee = await Employee.findById(req.user._id)

    // Validate
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(statusCodes.BAD_REQUEST).json({
        message: "All fields are required",
      })
    }

    if (newPassword !== confirmPassword) {
      return res.status(statusCodes.BAD_REQUEST).json({
        message: "Passwords do not match",
      })
    }

    if (oldPassword === newPassword) {
      return res.status(statusCodes.BAD_REQUEST).json({
        message: "New password must be different from old password",
      })
    }

    // Check old password
    const isMatch = await comparePassword(
      oldPassword,
      employee.password
    )

    if (!isMatch) {
      return res.status(statusCodes.UNAUTHORIZED).json({
        message: "Old password is incorrect",
      })
    }

    // Hash new password
    const hashed = await hashedPassword(newPassword)

    employee.password = hashed
    employee.isFirstLogin = false
    employee.failedAttempts = 0
    employee.lockUntil = null

    await employee.save()

    return res.status(statusCodes.OK).json({
      message: "Password changed successfully,Please login again.",
    })

  } catch (error) {
    return res.status(statusCodes.SERVER_ERROR).json({
      message: error.message,
    })
  }
}

async employeeDashboard(req, res) {
  try {
    const employee = await Employee.findById(req.user._id)
      .select("-password -failedAttempts -lockUntil")

    if (!employee) {
      return res.status(statusCodes.NOT_FOUND).json({
        message: "Employee not found",
      })
    }

    return res.status(statusCodes.OK).json({
      message: `Welcome back, ${employee.name} 👋`,
      employee: {
        _id: employee._id,
        employeeId: employee.employeeId,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        department: employee.department,
        joiningDate: employee.joiningDate,
        isActive: employee.isActive,
        isFirstLogin: employee.isFirstLogin,
        lastLogin: employee.lastLogin,
        createdAt: employee.createdAt,
      },
    })

  } catch (error) {
    return res.status(statusCodes.SERVER_ERROR).json({
      message: "Server error",
    })
  }
}


async employeeProfile(req, res) {
  try {
    const employee = await Employee.findById(req.user._id)
      .select("-password -failedAttempts -lockUntil");

    if (!employee) {
      return res.status(statusCodes.NOT_FOUND).json({
        message: "Employee not found",
      });
    }

    return res.status(statusCodes.OK).json({
      employee,
    });

  } catch (error) {
    return res.status(statusCodes.SERVER_ERROR).json({
      message: "Server error",
    });
  }
}



async updateEmployeeProfile(req, res) {
  try {
    const { name, department } = req.body;

    if (!name) {
      return res.status(statusCodes.BAD_REQUEST).json({
        message: "Name is required",
      });
    }

    const employee = await Employee.findById(req.user._id);

    if (!employee) {
      return res.status(statusCodes.NOT_FOUND).json({
        message: "Employee not found",
      });
    }

    employee.name = name;
    employee.department = department ?? employee.department;

    await employee.save();

    return res.status(statusCodes.OK).json({
      message: "Profile updated successfully",
      employee: {
        name: employee.name,
        department: employee.department,
      },
    });

  } catch (error) {
    return res.status(statusCodes.SERVER_ERROR).json({
      message: error.message,
    });
  }
}

}

module.exports = new employeeAuthController()
