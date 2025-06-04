import { nanoid } from "nanoid";

export const generateNanoId=(length)=>{
    try{
        return nanoid(length);
    }catch(error){
        console.error('Error generating Nano ID:', error);
        throw new Error('Failed to generate Nano ID');
    }
};