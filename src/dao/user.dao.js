import User from '../models/user.model.js';
import bcrypt from 'bcrypt';



export const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email: email })
  }
  catch (err) {
    console.error(err);
    throw new Error('Error finding user by email', err.message);
  }
}



export const findUserById = async (id) => {
  try {
    return await User.findOne({ _id: id })
  }
  catch (err) {
    console.error(err);
    throw new Error('Error finding user by id', err.message);
  }
}



export const createUser = async (name, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword
    })
    await newUser.save()
    return newUser;
  }
  catch (err) {
    console.error(err);
    throw new Error('Error creating user', err.message);
  }
}