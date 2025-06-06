import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const findUserByEmail = async (email) => {
  return await User.findOne({email:email})
}

export const findUserById = async (id) => {
  return await User.findOne({_id:id})
}

export const createUser=async(name,email,password)=>{
const hashedPassword=await bcrypt.hash(password,10)
    const newUser=new User({
        name:name,
        email:email,
        password:hashedPassword
    })
    await newUser.save()
    return newUser;
}