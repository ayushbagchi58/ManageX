const express=require('express')
const adminAuthController = require('../controller/adminAuthController')
const AuthCheck = require('../middleware/Auth')

const router=express.Router()

router.post("/admin/login",adminAuthController.adminLogin)
router.get("/admin/dashboard",AuthCheck,adminAuthController.adminDashboard)
module.exports=router