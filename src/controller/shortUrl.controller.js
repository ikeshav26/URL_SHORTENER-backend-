import { createShortUrlWithoutUser } from '../services/shortUrl.service.js';
import urlSchema from '../models/shortUrl.model.js';
import { urlDocFromShortUrl } from '../dao/shortUrl.js';
import dotenv from 'dotenv';
dotenv.config();


export const createShortUrl=async (req,res)=>{
   const {url}=req.body;
   const shortUrl=await createShortUrlWithoutUser(url)
   res.send(process.env.APP_URI + shortUrl);
}

export const redirectFromShortUrl=async(req,res)=>{
    const {shorturl}=req.params;
   const urlDoc=await urlDocFromShortUrl(shorturl);
    if(urlDoc){
        res.redirect(urlDoc.full_url);
    }else{
        res.status(404).send('URL not found');
    }
}