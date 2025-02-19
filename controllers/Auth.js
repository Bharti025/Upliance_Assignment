const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken');
const { SendVerificationCode, WelcomeEmail } = require("../middleware/Email.js");
const UserModel=require("../models/User.js");
const dotenv=require("dotenv");
dotenv.config();
const register=async(req,res)=>{
try{
const {name,email,password}=req.body;
if(!email || !password || !name){
    res.status(400).json({success:false,message:"Please fill all the details"})
}
const Existuser=await UserModel.findOne({email});
if(Existuser){
    res.status(400).json({success:false,message:"User already registered"})    
}
const verificationCode=Math.floor(100000+Math.random()*900000);
const user=new UserModel({name,email,password,verificationCode});
user.password=await bcrypt.hash(password,10);

await user.save();
SendVerificationCode(user.email,verificationCode);
return res.status(200).json({success:true,message:"User registered"});
}
catch(err){
console.log(err);
return res.status(500).json({success:true,message:"Internal server error"});
}
}

const VerifyEmail=async(req,res)=>{
try{
const {code}=req.body;
const user=await UserModel.findOne({
    verificationCode:code
});
console.log(user);
if(!user){
    return res.status(400).json({success:false,message:"Invalid or expired code"});
}
user.isVerified=true;
user.verificationCode=undefined;
await user.save();
await WelcomeEmail(user.email,user.name);
return res.status(200).json({success:true,message:"Email verified succesfully"});
}
catch(err){
console.log(err);
return res.status(500).json({success:false,message:"Internal server error"});
}
}
const login=async(req,res)=>{
    try{
    const {name,email,password}=req.body;
    const user=await UserModel.findOne({email});
    const errorMsg="Auth failed email or password is wrong";
    if(!user){
    return res.status(403).
    json({message:errorMsg,success:false});
    }
    const isPassequal=await bcrypt.compare(password,user.password);
    if(!isPassequal){
        return res.status(403).json({message:errorMsg,success:false});
    }
   
    const jwtToken=jwt.sign({email:user.email, _id:user._id,},
        process.env.JWT_sec,
        {expiresIn:'24h'}
        )

    
    res.status(200).json({message:"Login Success",
    success:true,
    jwtToken, email, name:user.name});
    }
    catch(err){
        res.status(400).json({
            message:"Internal server error",
            success:false
        })
    }
}
module.exports={register,VerifyEmail,login};