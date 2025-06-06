import jsonwebtoken from 'jsonwebtoken';
import { createUser, findUserByEmail, findUserById } from '../dao/user.dao.js';
import { signToken } from '../utils/helper.js';

export const registerUser=async(name,email,password)=>{
    const user=await findUserByEmail(email);
    if(user){
        throw new Error('User already exists');
    }

    const newUser=await createUser(name,email,password);
    const token=await signToken({id:newUser._id})
    return token;
}