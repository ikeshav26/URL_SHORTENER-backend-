import express from 'express';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import connectDB from './src/config/monogo.config.js'
import urlSchema from './src/models/shortUrl.model.js'
import shortUrlRoute from './src/routes/shortUrl.route.js'
import auth_routes from './src/routes/auth.route.js';
import { redirectFromShortUrl } from './src/controller/shortUrl.controller.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { getAllUrls } from './src/controller/shortUrl.controller.js';
import { authMiddleware } from './src/middleware/auth.middleware.js';



const app=express();
dotenv.config();

const PORT=process.env.PORT;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
    origin:'http://localhost:5173', // your frontend URL
  credentials: true
}));

//Routes
app.use('/api/auth',auth_routes);


app.use('/api/create',shortUrlRoute);


app.get('/api/:shorturl',redirectFromShortUrl);



app.get('/',(req,res)=>{
    res.send('Welcome to URL Shortener API');
})


app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT} `)
})