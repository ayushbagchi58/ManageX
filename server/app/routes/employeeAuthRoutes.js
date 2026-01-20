const express=require('express')
const employeeAuthController = require('../controller/employeeAuthController')
const { employeeOnly } = require('../middleware/roleCheck')
const AuthCheck = require('../middleware/Auth')
const router=express.Router()

router.post("/employee/login",employeeAuthController.employeeLogin)
router.post("/employee/change-password",AuthCheck,employeeOnly,employeeAuthController.changePassword)
router.get("/employee/dashboard",AuthCheck,employeeOnly,employeeAuthController.employeeDashboard)
router.get("/employee/profile",AuthCheck,employeeOnly,employeeAuthController.employeeProfile)
router.put("/employee/profile",AuthCheck,employeeOnly,employeeAuthController.updateEmployeeProfile)
module.exports=router