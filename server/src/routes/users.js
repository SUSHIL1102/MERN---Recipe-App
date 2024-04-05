const {UserModel} = require('../models/Users');

//logging in and registering 
const express = require('express'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post("/register",async(req,res)=>
{
    const {username,password} = req.body;
    const user = await UserModel.find({username:username});

    if(user)
    {
        return res.json({message: "User already exists!"});
    }

    const hashedPassword = await bcrypt.hash(password,10); //hashing the password

    const newUser = new UserModel({username,password:hashedPassword}); //this is how u add smtg to DB
    await newUser.save();

    res.json({message:"User Registered Successfully!"});
});

router.post("/login" ,async(req,res)=>{
    const {username,password} = req.body;
    const user = await UserModel.findOne({username:username});

    if(!user){
        return res.json({message:"User doesn't exist!"});
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.json({message:"Username or password is incorrect"});
    }

    const token = jwt.sign({id:user._id},"secret");
    res.json({token,userID:user._id});
} );

module.exports = {router};
