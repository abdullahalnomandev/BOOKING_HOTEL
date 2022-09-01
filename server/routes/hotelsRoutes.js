import express from 'express';
import {  createHotel, getAllCityHotels, getHotels, getSingleHotel, updateHotel } from "../controllers/hotelsController.js";
import { verifyAdmin, verifyToken, verifyUser } from '../middleware/VerifyToken.js';

 const router = express.Router();

 /** 
 *@api {post} /Post Hotels
 *@apiPermissions {post} /Post
 */

router.post('/post',verifyAdmin, createHotel);
router.post('/allCityHotels',verifyAdmin, getAllCityHotels);
router.post('/', getHotels);
router.post("/singleHotel",verifyUser, getSingleHotel);
router.patch('/',verifyAdmin, updateHotel);



export default router;