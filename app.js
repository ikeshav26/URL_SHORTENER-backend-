import express from 'express';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import connectDB from './src/config/monogo.config.js'
import urlSchema from './src/models/shortUrl.model.js'
import shortUrlRoute from './src/routes/shortUrl.route.js'

const app=express();
dotenv.config();

const PORT=process.env.PORT;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Routes
app.use('/api/create',shortUrlRoute);


app.get('/api/:shorturl',async(req,res)=>{
    const {shorturl}=req.params;
    const urlDoc=await urlSchema.findOne({
        short_url:shorturl
    });
    if(urlDoc){
        res.redirect(urlDoc.full_url);
    }else{
        res.status(404).send('URL not found');
    }
})


app.get('/',(req,res)=>{
    res.send('Welcome to URL Shortener API');
})


app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT} `)
})