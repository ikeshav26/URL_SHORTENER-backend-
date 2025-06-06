import urlSchema from "../models/shortUrl.model.js";


//Saving short url to database along long url
export const saveShortUrl = async (shortUrl, fullUrl, userId) => {
    try {
        const newUrl = new urlSchema({
            full_url: fullUrl,
            short_url: shortUrl
        })
        if (userId) {
            newUrl.user = userId;
        }
        newUrl.save()
    } catch (error) {
        console.error('Error saving short URL:', error);
        throw new Error('Failed to save short URL');
    }
}



//Fetching url document using short url and increasing clicl count by 1
export const urlDocFromShortUrl = async (shorturl) => {
   try{
     const urlDoc = await urlSchema.findOneAndUpdate({
        short_url: shorturl
    }, {
        $inc: { clicks: 1 }
    });
    return urlDoc;
   }catch(error){
         console.error('Error fetching URL document from short URL:', error);
         throw new Error('Failed to fetch URL document');
   }
}


export const getCustomShortUrl=async(shortUrl)=>{
    return await urlSchema.findOne({short_url:shortUrl});
}