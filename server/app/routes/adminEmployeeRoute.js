const express=require('express')
const adminEmployeeController = require('../controller/adminEmployeeController')
const AuthCheck = require('../middleware/Auth')
const {adminOnly}=require('../middleware/roleCheck')
const router=express.Router()

router.post("/admin/create-employee",AuthCheck,adminOnly,adminEmployeeController.createEmployee)
router.get("/admin/employees",AuthCheck,adminOnly,adminEmployeeController.getEmployees)
router.patch("/admin/employee/:id/status",AuthCheck,adminOnly,adminEmployeeController.updateEmployeeStatus)
router.post("/admin/reset-password/:id",AuthCheck,adminOnly,adminEmployeeController.resetEmployeePassword)
module.exports=router