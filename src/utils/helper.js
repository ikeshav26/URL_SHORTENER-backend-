import { nanoid } from "nanoid";
import { cookieOptions } from "../config/config.js";
import jsonwebtokken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const generateNanoId=(length)=>{
    try{
        return nanoid(length);
    }catch(error){
        console.error('Error generating Nano ID:', error);
        throw new Error('Failed to generate Nano ID');
    }
};



export const signToken=(payload)=>{
    try{
        const token=jsonwebtokken.sign(payload, process.env.JWT_SECRET,{expiresIn: '1h'} )// Token expires in 1 hour);
    return token;
    }
    catch(error){
        console.error('Error signing token:', error);
        throw new Error('Failed to sign token');
    }
}



export const verifyToken=(token)=>{
   try{
     return jsonwebtokken.verify(token,process.env.JWT_SECRET)
   }
   catch(error){
    console.error('Error verifying token:', error);
    throw new Error('Failed to verify token');
   }
}