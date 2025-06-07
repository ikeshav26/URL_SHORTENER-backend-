import { cookieOptions } from "../config/config.js";
import { registerUser , loginUser } from "../services/auth.service.js";

export const register=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
    const token=await registerUser(name,email,password);
    res.cookie('token',token,cookieOptions)
    res.status(200).json({message:"User registered successfully", user:{name,email}});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error", error: err.message});
    }
}

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
    const{ token,user}=await loginUser(email,password);
    res.cookie('token',token,cookieOptions);
    res.status(200).json({message:"User logged in successfully", user});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error", error: err.message});
    }
}