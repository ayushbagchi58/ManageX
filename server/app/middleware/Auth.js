const jwt=require('jsonwebtoken')
const { statusCodes } = require('../helper/statusCodes')

const AuthCheck=async(req,res,next)=>{
    const token=req?.body?.token||req?.query?.token||req?.headers['x-access-token']||req?.headers['authorization']
    if(!token){
        return res.status(statusCodes.UNAUTHORIZED).json({
            message:"token is required"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET||"1234")
        req.user=decoded
    }catch(error){
        return res.status(statusCodes.UNAUTHORIZED).json({
            message:"Invalid token"
        })
    }
    return next()
}
module.exports=AuthCheck