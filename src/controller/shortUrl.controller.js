import { createShortUrlWithoutUser, createShortUrlWithUser } from '../services/shortUrl.service.js';
import urlSchema from '../models/shortUrl.model.js';
import { urlDocFromShortUrl } from '../dao/shortUrl.js';
import dotenv from 'dotenv';
import { verifyToken } from '../utils/helper.js';
dotenv.config();

// creating short url 
export const createShortUrl = async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).send('URL is required');
        }

        let shortUrl=await createShortUrlWithoutUser(url);
        
        res.send(process.env.APP_URI + shortUrl);
    } catch (error) {
        console.error('Error creating short URL:', error);
        res.status(500).send('Internal Server Error');
    }
};

// redirecting to full url by getting it from short url
export const redirectFromShortUrl = async (req, res) => {
    try {
        const { shorturl } = req.params;
        const urlDoc = await urlDocFromShortUrl(shorturl);
        if (urlDoc) {
            res.redirect(urlDoc.full_url);
        } else {
            res.status(404).send('URL not found');
        }
    } catch (error) {
        console.error('Error redirecting from short URL:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const createShortUrlAuth = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: user not found" });
        }
        const { url, customUrl } = req.body;
        const shortUrl = await createShortUrlWithUser(url, req.user._id, customUrl);
        return res.send(process.env.APP_URI+ shortUrl);
    } catch (error) {
        console.error('Error creating custom short URL:', error);
        res.status(500).send('Internal Server Error');
    }
};


export const getAllUrls = async (req, res) => {
    try {
        // If you want to get all URLs for the logged-in user:
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: user not found" });
        }
        const urls = await urlSchema.find({ user: req.user._id });
        res.json(urls);
    } catch (err) {
        console.error('Error fetching URLs:', err);
        res.status(500).send('Internal server error');
    }
};