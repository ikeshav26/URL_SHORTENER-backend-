import { createShortUrlWithoutUser } from '../services/shortUrl.service.js';
import urlSchema from '../models/shortUrl.model.js';
import { urlDocFromShortUrl } from '../dao/shortUrl.js';
import dotenv from 'dotenv';
dotenv.config();



//creating short url 
export const createShortUrl=async (req,res)=>{
   try{
    const {url}=req.body;
    if(!url){
        return res.status(400).send('URL is required');
    }
   
   const shortUrl=await createShortUrlWithoutUser(url)
   res.send(process.env.APP_URI + shortUrl);
} catch (error) {
    console.error('Error creating short URL:', error);
    res.status(500).send('Internal Server Error');
   }
}


//redirecting to full url by getting it from short url
export const redirectFromShortUrl=async(req,res)=>{
    try{
        const {shorturl}=req.params;
   const urlDoc=await urlDocFromShortUrl(shorturl);
    if(urlDoc){
        res.redirect(urlDoc.full_url);
    }else{
        res.status(404).send('URL not found');
    }
    }catch{error}{
        console.error('Error redirecting from short URL:', error);
        res.status(500).send('Internal Server Error');
    }
}