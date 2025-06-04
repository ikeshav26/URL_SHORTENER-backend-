import { generateNanoId } from "../utils/helper.js";
import urlSchema from "../models/shortUrl.model.js";

export const createShortUrlService=(url)=>{
    const shorturl =generateNanoId(7);
    const newUrl=new urlSchema({
        full_url:url,
        short_url:shorturl
    })
    newUrl.save()
    return shorturl;
}