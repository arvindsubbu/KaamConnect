const User = require("../Models/userModel");
const Provider = require("../Models/providerModel");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const addUser = async (req, res) => {
    //console.log(req)
  try {
    const existingUser = await User.findOne({ phone: req.body.phone });
    if (existingUser) {
      return res.send({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({...req.body,password: hashedPassword});
    //console.log("from addUser", newUser);
    await newUser.save();

    if(req.body.role === 'provider'){
        const provider = new Provider({
            userId : newUser._id,
            serviceCategory : req.body.serviceCategory,
            yearsOfExperience : Number(req.body.yearsOfExperience),
            pricing : Number(req.body.pricing) || 0,
            location : req.body.location
        })
        await provider.save();
    }
    
    res.send({
      success: true,
      message: "SignedUp successfully",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.body.phone });
    if (!user) {
      return res.send({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.send({
        success: false,
        message: "Invalid password",
      });
    }
    console.log(user);
    const token = jwt.sign({ userId: user._id,role : user.role }, process.env.secret_key, {
      expiresIn: "1d",
    });
    console.log(token);
    
    res.send({
      success: true,
      message: "User logged in successfully",
      data: token,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    console.log("from server", user);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const consumer = user.toObject();

    const provider = await Provider.findOne({userId : user._id});

    res.send({
      success: true,
      message: "You are authorized to go to the protected route",
      data: {
        consumer,
        provider : provider || null ,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { addUser, loginUser, getCurrentUser };
