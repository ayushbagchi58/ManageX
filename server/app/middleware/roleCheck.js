const { statusCodes }=require('../helper/statusCodes.js')

const adminOnly=async(req,res,next)=>{
    if(!req.user||req.user.role!=="admin"){
        return res.status(statusCodes.FORBIDDEN).json({
            message:"Admin access only!"
        })
    }
    next()
}

const employeeOnly=async(req,res,next)=>{
    if(!req.user||req.user.role!=="employee"){
        return res.status(statusCodes.FORBIDDEN).json({
            message:"Employee access only!"
        })
    }
    next()
}

module.exports={adminOnly,employeeOnly}