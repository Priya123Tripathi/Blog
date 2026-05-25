const router=require("express").Router();
const jwt = require("jsonwebtoken");  
const bcrypt = require("bcryptjs");
const User = require("../model/User");
router.get("/",(req,res)=>{
res.send("Auth route");
});

router.post("/signup",async(req,res)=>{
try{
 const {username,email,password}=req.body;
 
 const existingUser=await User.findOne({email});

 if(existingUser){
    return res.status(400).json({
        message:"User already exist"
    });
 }
 const hashedPassword=await bcrypt.hash(password,10);

 const user=await User.create({
    username,
    email,
    password:hashedPassword
 });

 res.status(201).json({
    message:"Signup successful"
 });



}catch(err){
    console.log(err);
}
});

router.post("/login",async(req,res)=>{
try{

const{email,password}=req.body;

const user=await User.findOne({email});

if(!user){
    return res.status(400).json({
        message:"Invalid email"
    });
}
const isMatch=await bcrypt.compare(
    password,
    user.password
)
if(!isMatch){
    return res.status(400).json({
        message:"wrong password"
    });
}
const token = jwt.sign(
         { id: user._id },
         process.env.JWT_SECRET
      );


      res.json({
         token,
         user
      });
 
}catch(err){
    console.log(err);
}
})
 module.exports=router;