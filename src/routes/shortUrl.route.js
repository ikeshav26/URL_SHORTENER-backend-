import express from 'express';
import { createShortUrl, createShortUrlAuth } from '../controller/shortUrl.controller.js';
import {authMiddleware} from '../middleware/auth.middleware.js';


const router=express.Router();

router.post('/',createShortUrl);
router.post('/custom',authMiddleware,createShortUrlAuth);

export default router;