
module.exports = (req,res,next) => {
    
    const isAdmin = req.user.isAdmin;
    console.log(req.user)
    if(!isAdmin){
        const err = {status:401,msg:'No token, authorization failed'}
        return next(err)
    }
    next()
}