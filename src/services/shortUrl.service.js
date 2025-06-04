import { generateNanoId } from "../utils/helper.js";
import urlSchema from "../models/shortUrl.model.js";
import { saveShortUrl } from "../dao/shortUrl.js";


export const createShortUrlWithoutUser=async (url)=>{
    try{
        const shorturl =generateNanoId(7);
    await saveShortUrl(shorturl,url);
    return shorturl;
    }catch(error){
        console.error('Error creating short URL without user:', error);
        throw new Error('Failed to create short URL without user');
    }
}

export const createShortUrlWithUser=async (url,userId)=>{
   try{
     const shorturl =generateNanoId(7);
    await saveShortUrl(shorturl,url,userId);
    return shorturl;
   }catch(error){
        console.error('Error creating short URL with user:', error);
        throw new Error('Failed to create short URL with user');
   }
}

