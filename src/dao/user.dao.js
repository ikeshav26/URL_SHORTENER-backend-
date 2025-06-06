import User from '../models/user.model.js';

export const findUserByEmail = async (email) => {
  return await User.findone({email:email})
}

export const findUserById = async (id) => {
  return await User.findone({_id:id})
}

export const createUser=async(name,email,password)=>{
    const newUser=new User({
        name:name,
        email:email,
        password:password
    })
    await newUser.save()
    return newUser;
}