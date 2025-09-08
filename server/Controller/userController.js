const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const addUser = async (req,res)=>{
    try{
        const existingUser = await User.findOne({phone : req.body.phone})
        if(existingUser){
            return res.send({
                success : false,
                message : 'User already exists'
            })
        }
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const newUser = new User({...req.body,password : hashedPassword});
        console.log('from addUser',newUser);
        await newUser.save();
        res.send({
            success : true,
            message : 'Signed Up successfully'
        })
    }catch(err){
       res.status(400).json({message : err.message});
    }
}

const loginUser = async (req,res)=>{
    try{
        const user = await User.findOne({phone : req.body.phone});
        if(!user){
            return res.send({
                success : false,
                message : 'User not found'
            })
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password);
        if(!isMatch){
            return res.send({
                success : false,
                message : 'Invalid password',
            })
        }
        const token = jwt.sign({userId : user._id},process.env.secret_key,{expiresIn : '1d'});
        res.send({
            success : true,
            message : 'User logged in successfully',
            data : token,
            role : user.role
        })
    }catch(err){
        res.status(400).json({message : err.message});
    }
}

const getCurrentUser = async (req,res)=>{
    try{
        const user = await User.findById(req.userId).select('-password');
        console.log('from server',user);
        if(!user){
            return res.status(404).send({
                success : false,
                message : 'User not found',
            })
        }
        res.send({
            success : true,
            message : 'You are authorized to go to the protected route',
            data : user,
        })
    }catch(err){
        res.status(400).json({message : err.message});
    }
}

module.exports = {addUser,loginUser,getCurrentUser};