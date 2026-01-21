const { hashedPassword } = require("../helper/adminAuthHelper");
const { statusCodes } = require("../helper/statusCodes");
const Employee = require("../model/EmployeeModel");
const generateEmployeeId = require("../utils/generateEmployeeId");
const generatePassword = require("../utils/generatePassword");
const sendEmployeeCredentials = require("../utils/sendMail");
class adminEmployeeController {
  async createEmployee(req, res) {
    try {
      const { name, email, role, department, joiningDate } = req.body;

      //validate input
      if (!name || !email) {
        return res.status(statusCodes.BAD_REQUEST).json({
          message: "Name and Email are required",
        });
      }

      //if employee already exists
      const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee) {
        return res.status(statusCodes.CONFLICT).json({
          message: "Employee already exists with this email",
        });
      }

      //generate credentials
      const employeeId = generateEmployeeId();
      const tempPassword = generatePassword();
      const passwordHash = await hashedPassword(tempPassword);

      //create employee
      const employee = await Employee.create({
        employeeId,
        name,
        email,
        password: passwordHash,
        role: role,
        department,
        joiningDate,
        isActive: true,
        isFirstLogin: true,
      });

      //send credentials via email
      // send credentials via email
try {
  await sendEmployeeCredentials(email, employeeId, tempPassword);
  console.log("Email sent");
} catch (err) {
  console.error("Email failed:", err.message);
}


      return res.status(statusCodes.CREATED).json({
        message: "Employee created successfully!",
        employee: {
          _id: employee._id,
          employeeId: employee.employeeId,
          name: employee.name,
          email: employee.email,
          role: employee.role,
        },
      });
    } catch (error) {
      return res.status(statusCodes.SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  async getEmployees(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || "";

      const { role, department, isActive, joiningStart, joiningEnd } =
        req.query;

      const sortBy = req.query.sortBy || "createdAt";
      const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

      const skip = (page - 1) * limit;
      const filter = {};

      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ];
      }

      if (role) {
        filter.role = role;
      }

      if (department) {
        filter.department = department;
      }

      if (isActive !== undefined) {
        filter.isActive = isActive === "true";
      }

      if (joiningStart || joiningEnd) {
        filter.joiningDate = {};
        if (joiningStart) {
          filter.joiningDate.$gte = new Date(joiningStart);
        }
        if (joiningEnd) {
          filter.joiningDate.$lte = new Date(joiningEnd);
        }
      }

      const allowedSortFields = [
        "createdAt",
        "name",
        "email",
        "joiningDate",
        "lastLogin",
      ];

      const sortField = allowedSortFields.includes(sortBy)
        ? sortBy
        : "createdAt";

      const sort = { [sortField]: sortOrder };

      const employees = await Employee.find(filter)
        .select("-password -failedAttempts -lockUntil")
        .sort(sort)
        .skip(skip)
        .limit(limit);

      const total = await Employee.countDocuments(filter);

      return res.status(statusCodes.OK).json({
        message: "Employees fetched successfully",
        data: {
          employees,
          pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
          },
        },
      });
    } catch (error) {
      return res.status(statusCodes.SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  async updateEmployeeStatus(req, res) {
    try {
      const { id } = req.params;

      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(statusCodes.NOT_FOUND).json({
          message: "Employee not found",
        });
      }

      employee.isActive = !employee.isActive;
      await employee.save();

      return res.status(statusCodes.OK).json({
        message: `Employee ${employee.isActive ? "activated" : "deactivated"} successfully`,
        data: {
          _id: employee._id,
          isActive: employee.isActive,
        },
      });
    } catch (error) {
      return res.status(statusCodes.SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  async resetEmployeePassword(req, res) {
    try {
      const { id } = req.params;

      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(statusCodes.NOT_FOUND).json({
          message: "Employee not found",
        });
      }

      const tempPassword = generatePassword();

      const hashed = await hashedPassword(tempPassword);

      employee.password = hashed;
      employee.isFirstLogin = true;
      await employee.save();
      try{
       await sendEmployeeCredentials(employee.email, employee.employeeId, tempPassword)
         console.log("Reset password email sent")
      }catch(err){
          console.error("Reset password email failed:", err.message)
      }

      return res.status(statusCodes.OK).json({
        message: "Password reset successfully and email sent to employee",
      });
    } catch (error) {
      return res.status(statusCodes.SERVER_ERROR).json({
        message: error.message,
      });
    }
  }
}

module.exports = new adminEmployeeController();
