const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    try{
        console.log('req headers',req.headers);
        const token = req.headers.authorization.split(' ')[1];
        console.log('token',token);
        const verifiedToken = jwt.verify(token,process.env.secret_key);
        console.log('verfication key',verifiedToken);
        req.userId =verifiedToken.userId;
        console.log(req.body)
        next();
    }catch(err){
        res.status(401).json({message : 'Unauthorized access'});
    }
}

module.exports = auth;