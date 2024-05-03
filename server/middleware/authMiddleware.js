const jwt = require("jsonwebtoken");

module.exports = function (req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.jwt_secret);
        req.body.userId=decoded.userId;
        next();
    }catch(err){
        return res.status(401).json({success:false, message:"Invalid token"})
    }
}