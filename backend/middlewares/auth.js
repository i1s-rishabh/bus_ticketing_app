const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function (req, res, next) {

    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is invalid' });
    }
}


    // if(!token){
    //     const err = {status:401,msg:'No token, authorization failed'}
    //     return next(err);
    // }
    // try{
    //     console.log(token)
    //     const decoded = jwt.verify(token, config.get('jwtSecret'))
    //     console.log(decoded.user)
    //     req.user = decoded.user;
    //     return next()

    // }
    // catch(err){
    //     return next({status:401,error:"Token is not valid"})
    // } 
// } 