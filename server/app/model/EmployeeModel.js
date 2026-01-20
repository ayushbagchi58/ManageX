const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["employee", "manager", "hr"],
      default: "employee"
    },

    department: {
      type: String,
      default: null
    },

    joiningDate: {
      type: Date,
      default: null
    },

    isActive: {
      type: Boolean,
      default: true
    },

    isFirstLogin: {
      type: Boolean,
      default: true
    },

    lastLogin: {
      type: Date
    },

    failedAttempts: {
      type: Number,
      default: 0
    },

    lockUntil: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
