const validateUserAuth=(req,res,next)=>{
    if(!req.body.email||!req.body.password){
        return res.status(400).json({
            success:false,
            data:{},
            message:'something went wrong',
            err:'Email/Password missing in the request'
        });
    }
    next();
}
const validateIsAdminRequest=(req,res,next)=>{
    if(!req.body.id){
        return res.status(400).json({
            success:false,
            data:{},
            message:'something went wrong',
            err:'UserId Not Given'
        });
    }
    next();
}
module.exports={
    validateUserAuth,validateIsAdminRequest
}