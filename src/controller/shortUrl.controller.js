import { createShortUrlWithoutUser } from '../services/shortUrl.service.js';
import dotenv from 'dotenv';
dotenv.config();


export const createShortUrl=async (req,res)=>{
   const {url}=req.body;
   const shortUrl=await createShortUrlWithoutUser(url)
   res.send(process.env.APP_URI + shortUrl);
}