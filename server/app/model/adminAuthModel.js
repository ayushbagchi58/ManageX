const mongoose=require('mongoose')
const Schema=mongoose.Schema

const adminAuthSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"admin"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
})

const adminAuthModel=mongoose.model("adminAuth",adminAuthSchema)
module.exports=adminAuthModel