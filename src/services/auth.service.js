import jsonwebtoken from 'jsonwebtoken';
import { createUser, findUserByEmail, findUserById } from '../dao/user.dao.js';
import { signToken } from '../utils/helper.js';
import bcrypt from 'bcrypt';

export const registerUser=async(name,email,password)=>{
    try{
        const user=await findUserByEmail(email);
    if(user){
        throw new Error('User already exists');
    }

    const newUser=await createUser(name,email,password);
    const token=await signToken({id:newUser._id})
    return token;
    }
    catch(err){
        console.error(err);
        throw new Error('Error registering user', err.message);
    }
}


export const loginUser=async(email,password)=>{
    try{
        const user=await findUserByEmail(email);
    const isPasswordValid=bcrypt.compareSync(password, user.password);
    if(!user || !isPasswordValid){
        throw new Error('Invalid Credentials');
    }
    const token=await signToken({id:user._id})
    return token;
    }
    catch(err){
        console.error(err);
        throw new Error('Error logging in user', err.message);
    }
}