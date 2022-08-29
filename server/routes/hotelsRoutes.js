import express from 'express';
import {  createHotel, getAllCityHotels, getHotels, getSingleHotel, updateHotel } from "../controllers/hotelsController.js";

 const router = express.Router();

 /** 
 *@api {post} /Post Hotels
 *@apiPermissions {post} /Post
 */

router.post('/post',createHotel);
router.post('/allCityHotels',getAllCityHotels);
router.post('/',getHotels);
router.post('/singleHotel',getSingleHotel);
router.patch('/',updateHotel);

export default router;