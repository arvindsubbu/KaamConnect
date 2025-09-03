const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    try{
        console.log('req headers',req.headers);
        const token = req.headers.authorization(' ')[1];
        console.log('token',token);
        const verifiedToken = jwt.verify(token,process.env.secret_key);
        console.log('verfication key',verifiedToken);
        req.body.userId =verifiedToken.userId;
        next();
    }catch(err){
        res.status(401).json({message : 'Unauthorized access'});
    }
}

module.exports = auth;