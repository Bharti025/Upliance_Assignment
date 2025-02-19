const express=require("express");
const router=express.Router();
const {register, VerifyEmail,login}=require("../controllers/Auth.js");
router.post("/register",register);
router.post("/verifyemail",VerifyEmail);
router.post("/login",login);
module.exports=router;

