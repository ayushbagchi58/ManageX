require('dotenv').config()
const express=require('express')
const app=express()
const ejs=require('ejs')
const connectDB=require("./app/config/db")
const cors=require('cors')
const path=require('path')
connectDB()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs")
app.set("views","views")

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/uploads',express.static('uploads'))

const homeRoute=require('./app/routes/homeRoute')
app.use(homeRoute)

const adminAuthRoute=require('./app/routes/adminAuthRoute')
app.use('/api',adminAuthRoute)

const adminEmployeeRoute=require('./app/routes/adminEmployeeRoute')
app.use('/api',adminEmployeeRoute)

const employeeAuthRoutes=require('./app/routes/employeeAuthRoutes')
app.use('/api',employeeAuthRoutes)
const PORT=process.env.PORT||3006
app.listen(PORT,()=>{
    console.log(`Server is running on this ${PORT}`)
})