import urlSchema from "../models/shortUrl.model.js";

export const saveShortUrl=async(shortUrl,fullUrl,userId)=>{

    const newUrl=new urlSchema({
        full_url:fullUrl,
        short_url:shortUrl
    })
    if(userId){
        newUrl.user=userId;
    }
    newUrl.save()
}