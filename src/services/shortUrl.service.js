import { generateNanoId } from "../utils/helper.js";
import urlSchema from "../models/shortUrl.model.js";
import { saveShortUrl } from "../dao/shortUrl.js";


export const createShortUrlWithoutUser=async (url)=>{
    const shorturl =generateNanoId(7);
    await saveShortUrl(shorturl,url);
    return shorturl;
}

export const createShortUrlWithUser=async (url,userId)=>{
    const shorturl =generateNanoId(7);
    await saveShortUrl(shorturl,url,userId);
    return shorturl;
}

export const urlDocFromShortUrl=async(shorturl)=>{
     const urlDoc=await urlSchema.findOne({
        short_url:shorturl
    });
    return urlDoc;
}