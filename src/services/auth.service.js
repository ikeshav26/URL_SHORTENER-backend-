import jsonwebtoken from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { createUser, findUserByEmail, findUserById } from '../dao/user.dao.js';

export const registerUser=async(name,email,password)=>{
    const user=await findUserByEmail(email);
    if(user){
        throw new Error('User already exists');
    }

    const newUser=await createUser(name,email,password);
    const token=jsonwebtoken.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'1h'});
    return token;
}